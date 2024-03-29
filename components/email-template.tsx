import React from "react";

type EmailTemplateProps = {
  name: string;
  confirmOrResetLink: string;
  resetPassword: boolean;
};

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  confirmOrResetLink,
  resetPassword,
}) => {
  const displayText = resetPassword
    ? "reset your password"
    : "confirm your email";

  return (
    <div>
      <h1>Hi, {name}!</h1>
      <p>
        Click <a href={`${confirmOrResetLink}`}>here</a> to {`${displayText}`}.
      </p>
    </div>
  );
};

export default EmailTemplate;
