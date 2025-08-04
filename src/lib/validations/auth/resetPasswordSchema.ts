import { z } from "zod";
import { passwordSchema } from "../fieldsSchema";

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    newConfirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.newConfirmPassword, {
    message: "Passwords do not match",
    path: ["newConfirmPassword"],
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
