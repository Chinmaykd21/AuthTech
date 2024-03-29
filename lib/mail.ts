import EmailTemplate from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: Merge the two functions sendPasswordReset, and sendVerificationEmail
// to one function
export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const confirmOrResetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  const resetPassword = true;

  // TODO: Once domain has been set or obtained, update this
  // hardcoded URL to handle production scenario
  await resend.emails.send({
    from: "onboading@resend.dev",
    to: [email],
    subject: "Reset your password",
    react: EmailTemplate({ name, confirmOrResetLink, resetPassword }),
    text: "",
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  // TODO: Once domain has been set or obtained, update this
  // hardcoded URL to handle production scenario
  const confirmOrResetLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  const resetPassword = false;

  await resend.emails.send({
    from: "onboading@resend.dev",
    to: [email],
    subject: "Confirm your email",
    react: EmailTemplate({ name, confirmOrResetLink, resetPassword }),
    text: "",
  });
};
