import { z } from "zod";

export const emailSchema = z
  .email("Please enter a valid email address")
  .trim()
  .min(1, "Email is required")
  .max(255, "Email must be less than 255 characters");

export const firstNameSchema = z
  .string()
  .min(1, "First name is required")
  .min(2, "First name must be at least 2 characters")
  .max(50, "First name must be less than 50 characters")
  .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces")
  .trim();

export const lastNameSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => {
      if (!value) return true;
      return value.length >= 2 && value.length <= 50;
    },
    {
      message: "Last name must be between 2 and 50 characters",
    }
  )
  .refine(
    (value) => {
      if (!value) return true;
      return /^[a-zA-Z\s]+$/.test(value);
    },
    {
      message: "Last name can only contain letters and spaces",
    }
  );

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .trim();

export const phoneSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => {
      if (!value) return true;
      const cleaned = value.replace(/[\s\-\(\)\.]/g, "");

      const phoneRegex = /^[\+]?[\d]{7,20}$/;

      return phoneRegex.test(cleaned);
    },
    {
      message: "Please enter a valid international phone number (e.g., +61412345678 or 0412345678)",
    }
  ); 