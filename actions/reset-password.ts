"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetPasswordSchema } from "@/schemas";
import * as z from "zod";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Email!",
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  // TODO: Update name parameter to handle empty string
  await sendPasswordResetEmail(
    "",
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success: "Password reset email sent successfully!",
  };
};
