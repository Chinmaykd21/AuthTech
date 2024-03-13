import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      if (!user) return false;

      const existingUser = await getUserById(user.id ?? "");

      if (!existingUser || !existingUser?.emailVerified) return false;

      return true;
    },
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }

      if (session?.user && token?.role) {
        // Refer to the types/next-auth.d.ts
        // to see how we have extended the session
        // and token to have role field included.
        session.user.role = token.role as UserRole;
      }
      // TODO: Remove these in the final version
      // console.log(
      //   `**** session -> ${JSON.stringify(
      //     session
      //   )}\n**** token -> ${JSON.stringify(token)}`
      // );
      return session;
    },
    async jwt({ token, user }) {
      // The user will have a value only once during
      // log in. For all other sub-sequent calls it will have
      // undefined value.
      if (!user) return token;

      console.log(`*********** USER -> ${JSON.stringify(user)}`);
      token.role = user?.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
