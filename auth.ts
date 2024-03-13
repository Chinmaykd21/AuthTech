import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }

      if (session?.user && token?.role) {
        session.user.role = token.role;
      }

      console.log(
        `**** session -> ${JSON.stringify(
          session
        )}\n**** token -> ${JSON.stringify(token)}`
      );
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
