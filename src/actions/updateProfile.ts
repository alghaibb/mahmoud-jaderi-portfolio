"use server";

import { UpdateProfileValues, updateProfileSchema } from "@/schemas/index";

export async function updateProfile(values: UpdateProfileValues) {
  // TODO: Get the currently authenticated user

  const { name } = updateProfileSchema.parse(values);

  // TODO: Update user
}
