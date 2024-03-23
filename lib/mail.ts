import EmailTemplate from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  // TODO: Once domain has been set or obtained, update this
  // hardcoded URL to handle production scenario
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboading@resend.dev",
    to: [email],
    subject: "Confirm your email",
    react: EmailTemplate({ name, confirmLink }),
    text: "",
  });
};
