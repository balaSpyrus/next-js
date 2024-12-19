"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const FormSubmit = () => {
  const { pending } = useFormStatus();

  if (pending) {
    return <p>Creating post....</p>;
  }
  return (
    <p className="form-actions">
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </p>
  );
};

export default FormSubmit;
