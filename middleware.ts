import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

import {
  DEFAULT_LOGIN_REDRIECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const pathName = nextUrl?.pathname;

  const isApiAuthRoute = pathName?.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes?.includes(pathName);
  const isAuthRoute = authRoutes?.includes(pathName);

  // Order matters of the if conditions
  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    // TODO: Improve this logic to convert to single line code
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDRIECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

// NOTE: Matcher changed from this URL https://clerk.com/docs/quickstarts/nextjs?utm_source=sponsorship&utm_medium=youtube&utm_campaign=code-with-antonio&utm_content=12-31-2023
export const config = {
  // Every URL will invoke middleware except certain URLs that don't match this pattern
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Reference: https://authjs.dev/guides/upgrade-to-v5#edge-compatibility
