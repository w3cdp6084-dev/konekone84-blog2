import { GetStaticPaths, GetStaticProps } from 'next';
import { Client } from '@notionhq/client';

// Notion APIクライアントの初期化
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// getPosts関数の定義
async function getPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  const posts = response.results.map((page) => {
    const title = page.properties?.Title?.title?.[0]?.plain_text || '';
    return {
      id: page.id,
      title: title,
      // 他のプロパティもここで取得できます
    };
  });

  return posts;
}

// getPost関数の定義
async function getPost(id) {
  const response = await notion.pages.retrieve({ page_id: id });

  const post = {
    id: response.id,
    title: response.properties.Title.title[0].plain_text,
    date: response.properties.Date.date.start,
    content: response.properties.Content?.rich_text[0]?.plain_text || '',
    // 他のプロパティもここで取得できます
  };

  return post;
}

// getStaticPathsの定義
export async function getStaticPaths() {
  // ここですべての記事のIDを取得します
  const posts = await getPosts();
  const paths = posts.map((post) => ({ params: { id: post.id } }));
  // 重複したreturn文を削除します
  return { paths, fallback: false };
};

// getStaticPropsの定義
export async function getStaticProps({ params }) {
  // params.idを使用して記事の詳細データを取得します
  const post = await getPost(params.id);
  return { props: { post } };
};

// ページコンポーネントの定義
const Post = ({ post }) => {
  // ここで記事の詳細データを表示します
  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.date}</div>
      <div>{post.content}</div>
      <div>
        <a href={`/${post.previousId}`}>前の記事</a>
        <a href={`/${post.nextId}`}>次の記事</a>
      </div>
    </div>
  );
};

export default Post;