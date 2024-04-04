import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

type LogoutButtonProps = {
  children: React.ReactNode;
};

const LogoutButton: React.FC<Readonly<LogoutButtonProps>> = ({ children }) => {
  const onClick = () => {
    signOut();
  };

  return (
    <Button variant="secondary" size="lg" type="submit" onClick={onClick}>
      {children}
    </Button>
  );
};

export default LogoutButton;
