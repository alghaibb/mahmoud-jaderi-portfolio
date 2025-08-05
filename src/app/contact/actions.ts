"use server";

import { contactFormSchema, type ContactFormData } from "@/lib/validations/contactSchema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { renderWelcomeEmail } from "@/lib/email";

const resend = new Resend(env.RESEND_API_KEY);

async function createContactMessageWithRetry(data: ContactFormData, maxRetries = 2) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Test connection and create message
      await prisma.$connect();

      const contactMessage = await prisma.contactMessage.create({
        data: {
          name: data.lastName && data.lastName
            ? `${data.firstName} ${data.lastName}`
            : data.firstName,
          email: data.email,
          phone: data.phone || null,
          subject: data.subject || null,
          message: data.message,
        },
      });

      return contactMessage;
    } catch (error) {
      console.error(`Database attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const validatedData = contactFormSchema.parse(data);

    const contactMessage = await createContactMessageWithRetry(validatedData);

    // Send welcome email
    try {
      const emailHtml = await renderWelcomeEmail({
        userName: validatedData.firstName,
        userEmail: validatedData.email,
      });

      await resend.emails.send({
        from: "Mahmoud Jaderi <noreply@mahmoudjaderi.com>",
        to: validatedData.email,
        subject: "Thank you for reaching out - Mahmoud Jaderi",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Don't fail the form submission if email fails
    }

    revalidatePath("/contact");

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
      data: contactMessage,
    };
  } catch (error) {
    console.error("Contact form submission error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return {
        success: false,
        message: "Please check your form inputs and try again.",
        errors: error.message,
      };
    }

    // Handle specific database connection errors
    if (error instanceof Error) {
      if (error.message.includes("Can't reach database server") ||
        error.message.includes("Database connection failed") ||
        error.name === "PrismaClientInitializationError") {
        return {
          success: false,
          message: "We're experiencing database connectivity issues. Please try again in a few moments.",
          errors: "Database connection error",
        };
      }

      if (error.name === "PrismaClientKnownRequestError") {
        return {
          success: false,
          message: "There was an issue processing your request. Please try again.",
          errors: "Database request error",
        };
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      errors: "Unknown error",
    };
  }
} 