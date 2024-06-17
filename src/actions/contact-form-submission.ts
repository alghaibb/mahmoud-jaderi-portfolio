"use server";

import { z } from "zod";
import { ContactFormSchema } from "@/schemas";
import { sendContactMessage } from "@/utils/sendEmails";
import prisma from "@/lib/prisma";

export const contactFormSubmission = async (data: z.infer<typeof ContactFormSchema>) => {
  try {
    // Validate data
    const validatedData = ContactFormSchema.parse(data);

    // Check if data is valid
    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    // Name must be at least 3 characters
    if (validatedData.name.length < 3) {
      return { error: "Name must be at least 3 characters" };
    }

    // Subject must be at least 5 characters
    if (validatedData.subject.length < 5) {
      return { error: "Subject must be at least 5 characters" };
    }

    // Message must be at least 10 characters
    if (validatedData.message.length < 10) {
      return { error: "Message must be at least 10 characters" };
    }

    const { name, email, subject, message } = validatedData;

    // Save to the database
    await prisma.contactForm.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    // Send email using the contact email template
    await sendContactMessage(email, subject, message);

    return {
      success: "Message sent successfully"
    };

  } catch (error) {
    console.error("Error sending message:", error);
    return { error: "Error sending message" };
  }
};
