import React from "react";

type EmailTemplateProps = {
  name: string;
  confirmLink: string;
};

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  confirmLink,
}) => {
  return (
    <div>
      <h1>Hi, {name}!</h1>
      <p>
        Click <a href={`${confirmLink}`}>here</a> to confirm your email.
      </p>
    </div>
  );
};

export default EmailTemplate;
