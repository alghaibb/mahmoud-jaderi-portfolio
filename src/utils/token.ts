import prisma from "@/lib/prisma";

// Function to generate a 6-digit numeric OTP
const generateNumericOTP = (): string => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generates a number between 100000 and 999999
  return otp.toString();
};

// Generate a verification token
export const generateVerificationCode = async (email: string): Promise<string> => {
  const verificationToken = generateNumericOTP();
  const expires = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: verificationToken,
      expires,
    },
  });

  return verificationToken;
};

// Get verification token by email
export const getVerificationTokenByEmail = async (email: string, token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        identifier: email
      }
    })

    return verificationToken;
  } catch (error) {
    console.log(error);
  }
}

// Get verification token by token
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token
      }
    })

    return verificationToken;
  } catch (error) {
    console.log(error);
  }
}

// Delete the verification token from the database
export const deleteVerificationToken = async (email: string, token: string) => {
  return await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: email, token } },
  });
};