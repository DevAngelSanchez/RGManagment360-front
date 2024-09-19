import { VerificationEmailTemplate } from "@/templates/emails";
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);
const nextAuthUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'RGManagment <onboarding@resend.dev>',
      to: email,
      subject: 'Verify Email',
      react: VerificationEmailTemplate({ token, nextAuthUrl }),
    });

    if (error) {
      console.log(error)
      return {
        error: true
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.log(error);
    return {
      error: true
    }
  }
}