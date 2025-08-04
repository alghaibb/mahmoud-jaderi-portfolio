"use server";

import { checkAdminAuth } from "../login/actions";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { renderContactReplyEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";

const resend = new Resend(env.RESEND_API_KEY);

export async function getContactMessages() {
  await checkAdminAuth();

  try {
    const messages = await prisma.contactMessage.findMany({
      include: {
        replies: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return messages;
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    throw new Error("Failed to fetch messages");
  }
}

export async function replyToMessage(messageId: string, replyText: string) {
  await checkAdminAuth();

  try {
    // Get the original message
    const originalMessage = await prisma.contactMessage.findUnique({
      where: { id: messageId },
    });

    if (!originalMessage) {
      throw new Error("Message not found");
    }

    // Create the reply record
    await prisma.contactReply.create({
      data: {
        contactMessageId: messageId,
        message: replyText,
      },
    });

    // Update message status to REPLIED
    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { status: "REPLIED" },
    });

    // Send email reply
    try {
      const emailHtml = await renderContactReplyEmail({
        userName: originalMessage.name.split(" ")[0], // First name
        userEmail: originalMessage.email,
        originalSubject: originalMessage.subject || "Contact Form Submission",
        originalMessage: originalMessage.message,
        replyMessage: replyText,
        originalDate: originalMessage.createdAt.toLocaleDateString(),
      });

      await resend.emails.send({
        from: "Portfolio Contact <noreply@codewithmj.com>",
        to: originalMessage.email,
        subject: `Re: ${originalMessage.subject || "Your message"}`,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Error sending reply email:", emailError);
    }

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error replying to message:", error);
    throw new Error("Failed to send reply");
  }
}

export async function updateMessageStatus(messageId: string, status: string) {
  await checkAdminAuth();

  try {
    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { status: status as any },
    });

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating message status:", error);
    throw new Error("Failed to update status");
  }
} 