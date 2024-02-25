import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import SinglePost from "../components/Post/SinglePost";
import Tag from "../components/Tag/Tag";
import { getAllTags, getPostsForTopPage } from "../lib/notion";
export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(10);
  const allTags = await getAllTags();

  return {
    props: {
      fourPosts,
      allTags,
    },
    revalidate: 10,
  };
};

export default function Home({ fourPosts, allTags }: { fourPosts: any, allTags: any }) {
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul className="list">
        {fourPosts.map((post: { id: string, title: string, description: string, date: string, tags: string[], slug: string, thumbnail: string }) => (
          <li key={post.id} className="item">
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              thumbnail={post.thumbnail}
              isPaginationPage={false}
            />
          </li>
        ))}

      </ul>
      <div>
        <Link
            href="/posts/page/1"
            className="mb-6 lg:w-1/2 mx-auto px-5 block text-right"
          >
          ...もっと見る
        </Link>
        <Tag tags={allTags} />
      </div>
    </div>
  );
}