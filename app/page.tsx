import SignInButton from "@/components/auth/SignInButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-6">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold drop-shadow-md"> 🔐 Login </h1>
      </div>
      <SignInButton>
        <Button size="lg" variant="secondary">
          Sign In
        </Button>
      </SignInButton>
    </main>
  );
}
