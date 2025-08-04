import { z } from "zod";
import { emailSchema, firstNameSchema, lastNameSchema, phoneSchema } from "./fieldsSchema";

export const subjectSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => {
      if (!value) return true;
      return value.length >= 3 && value.length <= 200;
    },
    {
      message: "Subject must be between 3 and 200 characters",
    }
  );

export const messageSchema = z
  .string()
  .trim()
  .min(1, "Message is required")
  .min(10, "Message must be at least 10 characters")
  .max(2000, "Message must be less than 2000 characters");

export const contactFormSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: subjectSchema,
  message: messageSchema,
});

export type ContactFormData = z.infer<typeof contactFormSchema>; 