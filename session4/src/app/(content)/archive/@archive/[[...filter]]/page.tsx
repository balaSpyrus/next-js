import NewsList from "@/components/newsList";
import {
  getAvailableNewsMonths,
  getNewsForYear,
  getNewsForYearAndMonth,
  getAvailableNewsYears,
} from "@/db";
import Link from "next/link";
import { Suspense } from "react";

interface Props {
  params: Promise<{ filter: string[] }>;
}

type FilterProps = {
  year: string;
  month: string;
};

const getLinks = async (year: string, month: string) => {
  if (year && !month) {
    return getAvailableNewsMonths(year);
  } else if (year && month) {
    return [];
  }

  return getAvailableNewsYears();
};

const getNews = async (year: string, month: string) => {
  if (year && !month) {
    return getNewsForYear(year);
  } else if (year && month) {
    return getNewsForYearAndMonth(year, month);
  }

  return [];
};

const FilteredNews = async ({ year, month }: FilterProps) => {
  const news = await getNews(year, month);
  return news.length ? <NewsList news={news} /> : <p>No News</p>;
};

const FilterList = async ({ year, month }: FilterProps) => {
  const links = await getLinks(year, month);

  const yearList = await getAvailableNewsYears();
  const monthList = await getAvailableNewsMonths(year);

  if (
    (year && !month && !yearList.includes(year)) ||
    (month && !monthList.includes(month))
  ) {
    throw new Error("Invalid Filter");
  }

  return (
    <>
      {links.map((link) => (
        <li key={link}>
          <Link href={`/archive/${year ? `${year}/${link}` : link}`}>
            {link}
          </Link>
        </li>
      ))}
    </>
  );
};

const FilterArchives = async ({ params }: Props) => {
  const [year, month] = (await params).filter ?? [];

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            <Suspense fallback="Loading Filters...">
              <FilterList year={year} month={month || ""} />
            </Suspense>
          </ul>
        </nav>
        <Suspense fallback="Loading News...">
          <FilteredNews year={year} month={month || ""} />
        </Suspense>
      </header>
    </>
  );
};

export default FilterArchives;
