import { GetStaticProps } from 'next';
import { Client } from '@notionhq/client';
import { remark } from 'remark'
import html from 'remark-html';
import Link from 'next/link';

// Notion APIクライアントの初期化
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// マークダウンからHTMLに変換する関数
const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

// Notionからブログ投稿を取得する関数
const getPosts = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID is not defined");
  }

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  // レスポンスからブログ投稿のデータを抽出し、必要な変換を行う
  const posts = await Promise.all(
    response.results.map(async (page: any) => {
      // ページがPageObjectResponse型であることを確認
      if ('properties' in page) {
        // ここでは、ページのタイトルと日付を取得する例を示します
        const titleProperty = page.properties['Title'];
        const dateProperty = page.properties['Date'];

        let title = '';
        let date = '';

        if (titleProperty && titleProperty.type === 'title' && titleProperty.title.length > 0) {
          title = titleProperty.title[0].plain_text;
        }

        if (dateProperty && dateProperty.type === 'date' && dateProperty.date) {
          date = dateProperty.date.start;
        }

        return { id: page.id, title, date };
      }
    })
  );

  // undefinedの要素をフィルタリング
  return posts.filter(Boolean);
};

// getStaticPropsを使用してビルド時にブログ投稿を取得
export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  return { props: { posts } };
};

// ページコンポーネント
const Home = ({ posts }) => {
  return (
    <div>
      <h1>ブログ</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>
            <Link href={`/${post.id}`}>
              {post.title}
            </Link>
          </h2>
          <div>{post.date}</div>
        </article>
      ))}
    </div>
  );
};

export default Home;
