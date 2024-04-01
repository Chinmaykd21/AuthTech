import { auth, signOut } from "@/auth";
import { ModeToggle } from "./theme-switcher";
import { Button } from "./ui/button";

// TODO: When session active, add sign-out functionality
const LandingPageNavBar = async () => {
  const session = await auth();

  return (
    <div className="flex justify-between items-center p-3">
      <p className="text-2xl italic">Library Management System</p>
      <div className="flex justify-between items-center p-3 gap-x-4">
        {session ? (
          <form
            action={async () => {
              "use server";
              // Maybe some information about the user can be done here
              // thats why I would prefer this way of doing things.
              await signOut();
            }}
          >
            <Button variant="secondary" size="lg" type="submit">
              Sign Out
            </Button>
          </form>
        ) : null}
        <ModeToggle />
      </div>
    </div>
  );
};

export default LandingPageNavBar;
