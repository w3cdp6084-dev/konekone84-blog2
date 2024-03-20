import React from "react";
import { getAllPosts, getSinglePost } from "../../lib/notion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Link from "next/link";
import styles from "../styles/Post.module.scss";
import Head from 'next/head';
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

  const currentPageUrl = `https://example.com/posts/${post.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.metadata.title)}&url=${encodeURIComponent(currentPageUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPageUrl)}`;

  return (
    <>
      <Head>
        <title>{post.metadata.title}</title>
        <meta property="og:title" content={post.metadata.title} />
        <meta property="og:description" content={post.metadata.description} />
        <meta property="og:image" content={post.metadata.image} />
        <meta property="og:url" content={currentPageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metadata.title} />
        <meta name="twitter:description" content={post.metadata.description} />
        <meta name="twitter:image" content={post.metadata.image} />
      </Head>
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
        {/* シェアボタンの追加 */}
        <div className={styles.shareButtons}>
          <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
            Twitterでシェア
          </a>
          <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
            Facebookでシェア
          </a>
        </div>
      </article>
    </>
  );
};

export default Post;
