import EmailTemplate from "@/components/email-template";
import TwoFactorEmailTemplate from "@/components/two-factor-email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

// TODO: See if this can be updated later
export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboading@resend.dev",
    to: [email],
    subject: "Two Factor Code",
    react: TwoFactorEmailTemplate({ token }),
    text: "",
  });
};

// TODO: Merge the two functions sendPasswordReset, and sendVerificationEmail
// to one function
export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const confirmOrResetLink = `${domain}/auth/new-password?token=${token}`;
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
  const confirmOrResetLink = `${domain}/auth/new-verification?token=${token}`;
  const resetPassword = false;

  await resend.emails.send({
    from: "onboading@resend.dev",
    to: [email],
    subject: "Confirm your email",
    react: EmailTemplate({ name, confirmOrResetLink, resetPassword }),
    text: "",
  });
};
