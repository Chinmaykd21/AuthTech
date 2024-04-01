import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();

  return session ? session.data?.user : null;
};
