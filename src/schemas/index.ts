import { z } from "zod";

// Schema for updating a user's name in their profile
export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Cannot be empty"),
});

/* AUTH SCHEMAS */

// Create account form schema
export const CreateAccountFormSchema = z.object({
  name: z.string().min(3,
    { message: "Name must be at least 3 characters long" })
    .regex(/^[a-zA-Z]+$/, { message: "Please enter a valid name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Verify email form schema
export const VerifyEmailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  OTP: z.string().regex(/^\d{6}$/, { message: "Token must be a 6-digit number" }),
});

// Login form schema
export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

// Forgot password form
export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

// Password reset form schema
export const PasswordResetFormSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Contact form schema
export const ContactFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" })
    .regex(/^[a-zA-Z]+$/, { message: "Please enter your first and last name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters long" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" }),
});