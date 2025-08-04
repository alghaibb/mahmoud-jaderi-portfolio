import { z } from "zod";
import { emailSchema } from "../fieldsSchema";

export const resendOTPSchema = z.object({
  email: emailSchema,
});

export type ResendOTPValues = z.infer<typeof resendOTPSchema>;