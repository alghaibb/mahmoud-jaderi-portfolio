import prisma from "@/lib/prisma";
import VerifyEmail from "@/components/emails/VerifyEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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