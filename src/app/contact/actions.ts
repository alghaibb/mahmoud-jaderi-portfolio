"use server";

import { contactFormSchema, type ContactFormData } from "@/lib/validations/contactSchema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { renderWelcomeEmail } from "@/lib/email";

const resend = new Resend(env.RESEND_API_KEY);

export async function submitContactForm(data: ContactFormData) {
  try {
    const validatedData = contactFormSchema.parse(data);

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: validatedData.lastName && validatedData.lastName
          ? `${validatedData.firstName} ${validatedData.lastName}`
          : validatedData.firstName,
        email: validatedData.email,
        phone: validatedData.phone ? validatedData.phone : null,
        subject: validatedData.subject ? validatedData.subject : null,
        message: validatedData.message,
      },
    });

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

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      errors: "Database error",
    };
  }
} 