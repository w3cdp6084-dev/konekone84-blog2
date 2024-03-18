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
  const preprocessMarkdown = (markdown: string) => {
    return markdown.split('\n').join('  \n');
  };

  return (
    <article className={styles.container}>
      <header className={styles.slugHeader}>
        <div className={styles.contents}>
          {post.metadata.tags.map((tag: string, index: number) => (
            <p
              className={styles.tag}
              key={index}
            >
              <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
            </p>
          ))}
          <span className={styles.date}>{post.metadata.date}</span>
        </div>
        <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
      </header>
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
            paragraph: ({ node, children }) => {
              return <p className={styles.paragraph}>{children}</p>;
            },
          }}
        >
          {preprocessMarkdown(post.markdown)}
        </ReactMarkdown>
      </div>

      <Link href="/">
        <span className="pb-20 block mt-3 text-sky-900">←ホームに戻る</span>
      </Link>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-4 text-blue-500"
      >
        Topへ戻る
      </button>
    </article>
  );
};

export default Post;