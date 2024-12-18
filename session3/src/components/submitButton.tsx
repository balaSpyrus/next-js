"use client";
import React, { FC } from "react";
import { useFormStatus } from "react-dom";

const FormSubmit: FC<{
  label?: string;
}> = ({ label = "Submit" }) => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>{pending ? "Submitting..." : label}</button>
  );
};

export default FormSubmit;
