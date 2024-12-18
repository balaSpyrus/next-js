"use client";
import { usePathname } from "next/navigation";
import React from "react";

const FilterError = () => {
  const path = usePathname();
  return (
    <div id="error">
      <h2>Error Occurred</h2>
      <p>Invalid Path {path}</p>
    </div>
  );
};

export default FilterError;
