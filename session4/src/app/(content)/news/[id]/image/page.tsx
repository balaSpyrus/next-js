import { getNewsItem } from "@/db";
import { NextPage } from "next";

import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { ParamProps } from "../page";

const ImagePage: NextPage<ParamProps> = async ({ params }) => {
  const newsId = (await params).id;
  const newsDetails = await getNewsItem(newsId);

  if (!newsDetails) {
    notFound();
  }

  const { image } = newsDetails;
  return (
    <div className="fullscreen-image">
      <Image
        src={`/images/news/${image}`}
        alt={newsId}
        width={700}
        height={700}
      />
    </div>
  );
};

export default ImagePage;
