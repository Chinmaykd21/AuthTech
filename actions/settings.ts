"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { settingsSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";

export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  // This is to check if we don't have a incorrect user session
  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return {
      error: "Unauthorized",
    };
  }

  if (user.isOauth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values?.email !== user?.email) {
    const existingUser = await getUserByEmail(values.email as string);

    if (existingUser && existingUser?.id !== user?.id) {
      return {
        error: "Email already in user!",
      };
    }

    const verificationToken = await generateVerificationToken(
      values?.email as string
    );

    await sendVerificationEmail(
      verificationToken?.email,
      verificationToken?.token,
      values.name as string
    );

    return {
      success: "Verification email sent!",
    };
  }

  if (values?.password && values?.newPassword && dbUser?.password) {
    const passwordMatch = await bcryptjs.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return {
        error: "Incorrect Password!",
      };
    }

    const hashedPassword = await bcryptjs.hash(
      values.newPassword,
      process.env.SALT_ROUNDS!
    );

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });

  return {
    sucess: "Settings Updated",
  };
};
