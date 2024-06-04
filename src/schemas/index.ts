import { z } from "zod";

// Schema for updating a user's name in their profile
export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Cannot be empty"),
});

// Type for the values that can be passed to the updateProfileSchema
export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

