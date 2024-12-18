"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import classes from "./slideShow.module.css";
import { SLIDE_SHOW_IMGS } from "@/constants";

import React from "react";

const SlideShow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < SLIDE_SHOW_IMGS.length - 1 ? prevIndex + 1 : 0
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {SLIDE_SHOW_IMGS.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ""}
          alt={image.alt}
        />
      ))}
    </div>
  );
};

export default SlideShow;
