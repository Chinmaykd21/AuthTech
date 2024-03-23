"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing Token!");
      return;
    }
    const res = await newVerification(token);
    if (!res) {
      setError("Something went wrong!");
    }
    setSuccess(res.success);
    setError(res.error);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login page"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!error && !success ? <BeatLoader /> : null}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
