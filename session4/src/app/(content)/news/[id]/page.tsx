import { getNewsItem } from "@/db";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export interface ParamProps {
  params: Promise<{ id: string }>;
}

const NewDetails: NextPage<ParamProps> = async ({ params }) => {
  const newsId = (await params).id;
  const newsDetails = await getNewsItem(newsId);

  if (!newsDetails) {
    notFound();
  }

  const { image, title, date, content } = newsDetails;

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsId}/image`}>
          <Image
            src={`/images/news/${image}`}
            alt={newsId}
            width={100}
            height={100}
          />
        </Link>
        <h1>{title}</h1>
        <time dateTime={date}>{date}</time>
      </header>
      <p>{content}</p>
    </article>
  );
};

export default NewDetails;
