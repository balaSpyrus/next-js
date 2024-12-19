"use client";
import React, { FC, useActionState } from "react";
import FormSubmit from "./formSubmit";

type Props = {
  action: Parameters<
    typeof useActionState<{ errors?: string[] }, FormData>
  >["0"];
};

const PostForm: FC<Props> = ({ action }) => {
  const [state, formAction] = useActionState<{ errors?: string[] }, FormData>(
    action,
    {}
  );
  return (
    <form action={formAction}>
      <p className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
      </p>
      <p className="form-control">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="image"
          name="image"
        />
      </p>
      <p className="form-control">
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} />
      </p>
      <FormSubmit />
      {state.errors && (
        <ul className="form-errors">
          {state.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default PostForm;
