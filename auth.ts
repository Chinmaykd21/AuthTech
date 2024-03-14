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
  events: {
    async linkAccount({ user }) {
      console.log("**** user", JSON.stringify(user));
      await db.user.update({
        where: {
          id: user?.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Only have support for 2 providers, i.e.,
      // 1. Credentials
      // 2. Github
      // Allow Login for only these sources. If
      // user is coming from anywhere else, just
      // do not allow login.
      if (account?.type === "credentials") {
        const existingUser = await getUserById(user.id ?? "");
        if (!existingUser || !existingUser?.emailVerified) return false;
        return true;
      } else if (account?.type === "oauth" && account?.provider === "github") {
        return true;
      }
      return false;
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

      return session;
    },
    async jwt({ token, user }) {
      // The user will have a value only once during
      // log in. For all other sub-sequent calls it will have
      // undefined value.
      if (!user) return token;

      token.role = user?.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
