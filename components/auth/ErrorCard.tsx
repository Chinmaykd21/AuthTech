import React from "react";
import { CardWrapper } from "./CardWrapper";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something Went Wrong!"
      backButtonLabel="Back to Sign In"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex items-center justify-center ">
        <FaExclamationTriangle className="text-destructive h-4 w-4" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
