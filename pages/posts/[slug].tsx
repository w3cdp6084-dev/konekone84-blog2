import React from "react";
import { getAllPosts, getSinglePost } from "../../lib/notion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Link from "next/link";
import styles from "../styles/Post.module.scss";

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

interface PostProps {
  post: any;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <section className={styles.container}>
      <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">Posted date at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: string, index: number) => (
        <p
          className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
          key={index}
        >
          <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
        </p>
      ))}
      <div className="mt-10 font-medium">
        <ReactMarkdown
          components={{
            code({ node, className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code>{children}</code>
              );
            },
          }}
        >
          {post.markdown}
        </ReactMarkdown>

        <Link href="/">
          <span className="pb-20 block mt-3 text-sky-900">←ホームに戻る</span>
        </Link>
      </div>
    </section>
  );
};

export default Post;