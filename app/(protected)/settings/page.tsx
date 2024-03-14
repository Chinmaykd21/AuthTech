import { auth } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  // TODO: Remove these in final version
  console.log(`***** session -> ${JSON.stringify(session)}`);

  return <div>Settings Page!</div>;
};

export default SettingsPage;
