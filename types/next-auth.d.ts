import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";
import { UserRole } from "@prisma/client";

// Reference: https://stackoverflow.com/questions/74425533/property-role-does-not-exist-on-type-user-adapteruser-in-nextauth
// Refer to the answer by Deiby Rios

declare module "next-auth" {
  interface User {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOauth: boolean;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role;
    isTwoFactorEnabled;
    isOauth;
  }
}

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOauth: boolean;
};

// declare module "next-auth/jwt" {
//   // Extend token to hold the role before it gets put into the session
//   interface JWT {
//     role: UserRole & DefaultJWT;
//   }
// }
