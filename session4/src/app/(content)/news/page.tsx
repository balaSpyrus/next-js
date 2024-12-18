import NewsList from "@/components/newsList";
import { getAllNews } from "@/db";

const News = async () => {
  const news = await getAllNews();

  return (
    <>
      <div>News</div>
      <NewsList news={news} />
    </>
  );
};

export default News;
