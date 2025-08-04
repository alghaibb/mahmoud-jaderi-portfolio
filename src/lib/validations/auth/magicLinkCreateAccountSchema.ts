import { z } from "zod";
import { emailSchema, firstNameSchema, lastNameSchema } from "../fieldsSchema";

export const magicLinkCreateAccountSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
});

export type MagicLinkCreateAccountValues = z.infer<typeof magicLinkCreateAccountSchema>;