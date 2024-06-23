import prisma from "@/lib/prisma";

export const createFirstUser = async () => {
  // Check if there are any users in the database
  const userCount = await prisma.user.count();

  // Determine role based on the number of users
  const role = userCount === 0 ? "ADMIN" : "USER";

  return role;
};