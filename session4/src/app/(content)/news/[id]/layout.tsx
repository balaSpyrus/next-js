import React from "react";

interface Props {
  modal: React.ReactNode;
  children: React.ReactNode;
}
const NewsDetailsLayout = ({ children, modal }: Props) => {
  return (
    <>
      {modal}
      {children}
    </>
  );
};

export default NewsDetailsLayout;
