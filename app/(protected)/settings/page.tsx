"use client";

import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const session = useSession();
  return <div>Settings Page!</div>;
};

export default SettingsPage;
