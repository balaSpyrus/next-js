"use client";
import React, { ChangeEventHandler, FC, useRef, useState } from "react";
import classes from "./index.module.css";
import Image from "next/image";

type Props = {
  name?: string;
  label?: string;
};

const ImagePicker: FC<Props> = ({ name = "image", label = "Image Picker" }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [img, setImg] = useState<string | ArrayBuffer | null>(null);

  const onBtnClick = () => inputRef.current?.click?.();

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImg(null);
      return;
    }

    const fReader = new FileReader();
    fReader.onload = () => setImg(fReader.result);
    fReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {img ? (
            <Image src={img as string} alt={"image"} fill />
          ) : (
            <p>No Image Selected</p>
          )}
        </div>
        <input
          ref={inputRef}
          className={classes.input}
          type="file"
          id={name}
          name={name}
          required
          accept="image/jpeg, image/png"
          onChange={onInputChange}
        />
        <button className={classes.button} onClick={onBtnClick}>
          Pick an image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
