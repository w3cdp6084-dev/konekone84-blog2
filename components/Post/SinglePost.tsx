import Link from "next/link";
import React from "react";
import Image from 'next/image';

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  isPaginationPage: boolean;
  thumbnail: string;
};

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPaginationPage, thumbnail } = props;

  return (
    <>
      {isPaginationPage ? (
        <section className="items">
          <div className="lg:flex items-center">
            {thumbnail ? (
              <Image src={thumbnail} alt={title} width={128} height={128} className="object-cover rounded-md"/>
            ) : (
              <div>Loading...</div>
            )}
            <h2 className="text-gray-100 text-2xl font-medium mb-2">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <div className="text-gray-400 mr-2">{date}</div>
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span className="text-white bg-gray-500 rounded-xl px-2 font-medium mr-2">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-gray-100">{description}</p>
        </section>
      ) : (
        <section className="items">
          <Link href={`/posts/${slug}`}>
            <div className="flex items-center gap-3">
              {thumbnail ? (
                <Image src={thumbnail} alt={title} width={128} height={128} className="object-cover rounded-md"/>
              ) : (
                <div>Loading...</div>
              )}
              <h2 className="title">
                {title}
              </h2>
              <div className="date">{date}</div>
              {tags.map((tag: string, index: number) => (
                <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                  <span className="tag">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
            <p className="description">{description}</p>
          </Link>
        </section>
      )}
    </>
  );
};

export default SinglePost;