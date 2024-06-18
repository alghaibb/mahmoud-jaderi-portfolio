import prisma from "@/lib/prisma";
import { VerifyEmail, ForgotPassword, ContactEmail } from "@/components/emails";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Sends a verification email to the user
export const sendVerificationEmail = async (
  email: string,
  verificationCode: string,
) => {
  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?email=${encodeURIComponent(email)}`;

  // Get users name from database
  const user = await prisma.user.findUnique({
    where: { email },
    select: { name: true },
  });

  const userName = user?.name || "User";

  await resend.emails.send({
    from: "noreply@codewithmj.com",
    to: email,
    subject: "Verify your email address",
    react: (
      <VerifyEmail
        verificationCode={verificationCode}
        verificationLink={verificationLink}
        name={userName}
      />
    ),
  });
};

// Sends a password reset email to the user
export const sendPasswordResetEmail = async (
  email: string,
  resetPasswordToken: string,
) => {
  const resetPasswordLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetPasswordToken}`;

  // Get users name from database
  const user = await prisma.user.findUnique({
    where: { email },
    select: { name: true },
  });

  const userName = user?.name || "User";

  await resend.emails.send({
    from: "noreply@codewithmj.com",
    to: email,
    subject: "Reset your password",
    react: (
      <ForgotPassword
        usersName={userName}
        resetPasswordLink={resetPasswordLink}
      />
    ),
  });
};

// Sends contact message from user to my email
export const sendContactMessage = async (
  email: string,
  subject: string,
  message: string,
) => {
  await resend.emails.send({
    from: "noreply@codewithmj.com",
    to: process.env.CONTACT_TO_EMAIL as string,
    subject: `Contact form submission: ${subject}`,
    react: <ContactEmail email={email} subject={subject} message={message} />,
    reply_to: email,
  });
};
