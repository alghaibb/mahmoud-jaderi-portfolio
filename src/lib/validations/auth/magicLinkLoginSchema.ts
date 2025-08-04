import { z } from "zod";
import { emailSchema } from "../fieldsSchema";

export const magicLinkLoginSchema = z.object({
  email: emailSchema,
});

export type MagicLinkLoginValues = z.infer<typeof magicLinkLoginSchema>;