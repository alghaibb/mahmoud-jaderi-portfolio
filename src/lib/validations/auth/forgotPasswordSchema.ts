import { z } from "zod";
import { emailSchema } from "../fieldsSchema";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;