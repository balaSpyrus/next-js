import ModalBackdrop from "@/components/backdrop";
import { getNewsItem } from "@/db";
import { NextPage } from "next";
import Image from "next/image";

import { notFound } from "next/navigation";

export interface ParamProps {
  params: Promise<{ id: string }>;
}

const InterceptedImagePage: NextPage<ParamProps> = async ({ params }) => {
  const newsId = (await params).id;
  const newsDetails = await getNewsItem(newsId);

  if (!newsDetails) {
    notFound();
  }

  const { image } = newsDetails;
  return (
    <>
      <ModalBackdrop />
      <dialog open>
        <div className="fullscreen-image">
          <Image
            src={`/images/news/${image}`}
            alt={newsId}
            width={500}
            height={500}
          />
        </div>
      </dialog>
    </>
  );
};

export default InterceptedImagePage;
