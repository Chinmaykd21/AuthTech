import React from "react";

type TwoFactorEmailProps = {
  token: string;
};

const TwoFactorEmailTemplate: React.FC<Readonly<TwoFactorEmailProps>> = ({
  token,
}) => {
  return (
    <div>
      <p>{`Your 2FA code: ${token}`}</p>
    </div>
  );
};

export default TwoFactorEmailTemplate;
