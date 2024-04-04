"use client";

import { ModeToggle } from "./theme-switcher";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "./auth/UserButton";

const LandingPageNavBar = () => {
  const user = useCurrentUser();
  const pathName = usePathname();

  return (
    <div className="flex justify-between items-center p-3">
      <p className="text-2xl italic">Next Auth Practice</p>
      <div className="flex justify-between items-center p-3 gap-x-4">
        {user ? (
          <>
            <Button
              asChild
              variant={pathName !== "/client" ? "default" : "destructive"}
              size="sm"
            >
              <Link href="/client">Client</Link>
            </Button>
            <Button
              asChild
              variant={pathName !== "/server" ? "default" : "destructive"}
              size="sm"
            >
              <Link href="/server">Server</Link>
            </Button>
            <Button
              asChild
              variant={pathName !== "/admin" ? "default" : "destructive"}
              size="sm"
            >
              <Link href="/admin">Admin</Link>
            </Button>
            <Button
              asChild
              variant={pathName !== "/settings" ? "default" : "destructive"}
              size="sm"
            >
              <Link href="/settings">Settings</Link>
            </Button>
          </>
        ) : null}
      </div>
      <div className="flex gap-x-4">
        {user ? <UserButton /> : null}
        <ModeToggle />
      </div>
    </div>
  );
};

export default LandingPageNavBar;
