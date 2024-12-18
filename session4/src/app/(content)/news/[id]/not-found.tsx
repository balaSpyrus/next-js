"use client";
import { useParams } from "next/navigation";
import React from "react";

const NotFound = () => {
  const { id } = useParams();
  return (
    <div id="error">
      <h1>No Article</h1>
      <p>matching {id}</p>
    </div>
  );
};

export default NotFound;
