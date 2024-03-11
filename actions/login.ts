"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDRIECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields?.success) {
    return {
      error: "Invalid Fields!",
    };
  }

  const { email, password } = validatedFields?.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDRIECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid Credentials!",
          };
        default:
          return {
            error: "Something Went Wrong!",
          };
      }
    }

    // Required in next JS. TODO: Read and update comment accordingly
    throw error;
  }
};
