import EmailTemplate from "@/components/email-template";
import TwoFactorEmailTemplate from "@/components/two-factor-email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

// Note: To update from in the resend email,
// you will need to have domain which can be
// be bought for cheap price in godaddy.com
// After that, you need to add this domain to
// resend library settings and update the values
// in DNS on your domain in godaddy.com or whichever
// service you bought
// Ref: https://www.youtube.com/watch?v=1MTyCvS05V4
// TimeStamp: 7:54:25

// For this project, no new domain will be bought,
// so no code changes will happen here.
export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboading@resend.dev",
    to: [email],
    subject: "Two Factor Code",
    react: TwoFactorEmailTemplate({ token }),
    text: "",
  });
};

export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const confirmOrResetLink = `${domain}/auth/new-password?token=${token}`;
  const resetPassword = true;

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
