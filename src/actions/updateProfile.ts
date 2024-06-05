"use server";

import { z } from "zod";
import { updateProfileSchema } from "@/schemas/index";

export async function updateProfile(data: z.infer<typeof updateProfileSchema>) {
  // TODO: Get the currently authenticated user

  const { name } = updateProfileSchema.parse(data);

  // TODO: Update user
}
