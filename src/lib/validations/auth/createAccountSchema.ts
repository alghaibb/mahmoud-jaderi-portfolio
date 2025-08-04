import { z } from "zod";
import {
  emailSchema,
  firstNameSchema,
  lastNameSchema,
  passwordSchema,
} from "../fieldsSchema";

export const createAccountSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CreateAccountValues = z.infer<typeof createAccountSchema>;
