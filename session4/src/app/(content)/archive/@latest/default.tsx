import NewsList from "@/components/newsList";
import { getLatestNews } from "@/db";
import React from "react";

const Latest = async () => {
  const news = await getLatestNews();
  return (
    <>
      <h2>Latesg News</h2>
      <NewsList news={news} />
    </>
  );
};

export default Latest;
