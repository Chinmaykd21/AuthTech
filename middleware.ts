import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log(`ROUTE: ${req.nextUrl.pathname}\nIS LOGGEDIN: ${isLoggedIn}`);
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// NOTE: Matcher changed from this URL https://clerk.com/docs/quickstarts/nextjs?utm_source=sponsorship&utm_medium=youtube&utm_campaign=code-with-antonio&utm_content=12-31-2023
export const config = {
  // Every URL will invoke middleware except certain URLs that don't match this pattern
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Reference: https://authjs.dev/guides/upgrade-to-v5#edge-compatibility
