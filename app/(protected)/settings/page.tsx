import { auth } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  console.log(`***** session -> ${JSON.stringify(session?.user?.role)}`);

  return <div>Settings Page!</div>;
};

export default SettingsPage;
