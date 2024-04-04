"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { settingsSchema } from "@/schemas";
import * as z from "zod";

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
