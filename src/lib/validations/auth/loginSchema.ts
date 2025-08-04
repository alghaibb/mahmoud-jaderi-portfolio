import { z } from "zod";
import { emailSchema, passwordSchema } from "../fieldsSchema";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginValues = z.infer<typeof loginSchema>;
