import { NewsDetailsType } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  news: NewsDetailsType[];
}

const NewsList = ({ news }: Props) => {
  return (
    <ul className="news-list">
      {news.map(({ id, slug, image, title }) => (
        <li key={id}>
          <Link href={`/news/${slug}`}>
            <Image
              src={`/images/news/${image}`}
              alt={slug}
              width={100}
              height={100}
            />
            <span>{title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
