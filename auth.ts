import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "auth/login",
    error: "auth/error",
  },
  events: {
    async linkAccount({ user }) {
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

        // Prevent sign in without email verification
        if (!existingUser || !existingUser?.emailVerified) return false;
        // For 2FA
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id
          );

          if (!twoFactorConfirmation) return false;

          // Delete two factor confirmation for next sign in
          await db.twoFactorConfirmation.delete({
            where: {
              id: twoFactorConfirmation.id,
            },
          });
        }
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

      if (session?.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.isOauth = token.isOauth as boolean;
      }

      return session;
    },
    async jwt({ token, user }) {
      // The user will have a value only once during
      // log in. For all other sub-sequent calls it will have
      // undefined value.
      // So for the next sub sequent updates, we need to get
      // the user from the DB and then perform sub sequent actions
      // on it.
      let existingUser;

      if (!user) {
        existingUser = await getUserById(token.sub as string);
        if (!existingUser) {
          return token;
        }

        const existingAccount = await getAccountByUserId(existingUser?.id);

        token.name = existingUser?.name;
        token.email = existingUser?.email;
        token.role = existingUser?.role;
        token.isOauth = !!existingAccount;
        token.isTwoFactorEnabled = existingUser?.isTwoFactorEnabled;

        return token;
      }
      // This block of code will run during login
      // This way we are avoiding a DB call and
      // reducing a network request as well
      token.role = user?.role;
      token.isTwoFactorEnabled = user?.isTwoFactorEnabled;
      token.isOauth = user?.isOauth;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
