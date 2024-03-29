/**
 * An array of routes that will be accessible to the user who is not logged in.
 * These routes do not need an authentication
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that will not be accessible to the user who is not logged in.
 * These routes do need an authentication.
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentcation purpose
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDRIECT = "/settings";
