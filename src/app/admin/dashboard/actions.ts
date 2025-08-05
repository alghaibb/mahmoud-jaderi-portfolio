"use server";

import { checkAdminAuth } from "../login/actions";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { renderContactReplyEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";
import { MessageStatus } from "@/generated/prisma";

const resend = new Resend(env.RESEND_API_KEY);

export async function getContactMessages() {
  try {
    await checkAdminAuth();

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

    // Re-throw redirect errors
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

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
        from: "Mahmoud Jaderi <mahmoud_jaderi@codewithmj.com>",
        to: originalMessage.email,
        subject: `Re: ${originalMessage.subject || "Your message"}`,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Error sending reply email:", emailError);
      console.error("Email error details:", {
        error: emailError instanceof Error ? emailError.message : emailError,
        apiKeyExists: !!env.RESEND_API_KEY,
        from: "Mahmoud Jaderi <mahmoud_jaderi@codewithmj.com>",
        to: originalMessage.email,
      });
      // Don't throw error - reply is saved even if email fails
      console.log("Reply saved to database but email sending failed");
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
      data: { status: status as MessageStatus },
    });

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating message status:", error);
    throw new Error("Failed to update status");
  }
}

export async function getAdminAnalytics() {
  try {
    await checkAdminAuth();
    const totalMessages = await prisma.contactMessage.count();
    const unreadMessages = await prisma.contactMessage.count({
      where: { status: "UNREAD" },
    });
    const repliedMessages = await prisma.contactMessage.count({
      where: { status: "REPLIED" },
    });
    const readMessages = await prisma.contactMessage.count({
      where: { status: "READ" },
    });

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentMessages = await prisma.contactMessage.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Response time analytics
    const repliedMessagesWithTime = await prisma.contactMessage.findMany({
      where: {
        status: "REPLIED",
        replies: {
          some: {},
        },
      },
      include: {
        replies: {
          orderBy: { createdAt: "asc" },
          take: 1,
        },
      },
    });

    let avgResponseTime = 0;
    if (repliedMessagesWithTime.length > 0) {
      const responseTimes = repliedMessagesWithTime.map((msg) => {
        const messageTime = msg.createdAt.getTime();
        const replyTime = msg.replies[0]?.createdAt.getTime() || messageTime;
        return replyTime - messageTime;
      });
      avgResponseTime =
        responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    }

    return {
      totalMessages,
      unreadMessages,
      repliedMessages,
      readMessages,
      recentMessages,
      avgResponseTimeHours: Math.round(avgResponseTime / (1000 * 60 * 60)),
      responseRate:
        totalMessages > 0
          ? Math.round((repliedMessages / totalMessages) * 100)
          : 0,
    };
  } catch (error) {
    console.error("Error fetching admin analytics:", error);

    // Re-throw redirect errors
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

    throw new Error("Failed to fetch analytics");
  }
}

export async function bulkUpdateMessageStatus(
  messageIds: string[],
  status: string
) {
  await checkAdminAuth();

  try {
    await prisma.contactMessage.updateMany({
      where: {
        id: {
          in: messageIds,
        },
      },
      data: { status: status as MessageStatus },
    });

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error bulk updating message status:", error);
    throw new Error("Failed to bulk update status");
  }
}

export async function deleteMessage(messageId: string) {
  await checkAdminAuth();

  try {
    // Delete replies first due to foreign key constraint
    await prisma.contactReply.deleteMany({
      where: { contactMessageId: messageId },
    });

    // Delete the message
    await prisma.contactMessage.delete({
      where: { id: messageId },
    });

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error("Failed to delete message");
  }
}

export async function exportMessages(format: "csv" | "json" = "csv") {
  await checkAdminAuth();

  try {
    const messages = await prisma.contactMessage.findMany({
      include: {
        replies: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (format === "json") {
      return {
        data: JSON.stringify(messages, null, 2),
        filename: `contact-messages-${new Date().toISOString().split("T")[0]}.json`,
        contentType: "application/json",
      };
    }

    // CSV format
    const csvHeaders = [
      "Date",
      "Name",
      "Email",
      "Phone",
      "Subject",
      "Message",
      "Status",
      "Replies Count",
    ];
    const csvRows = messages.map((msg) => [
      msg.createdAt.toISOString().split("T")[0],
      msg.name,
      msg.email,
      msg.phone || "",
      msg.subject || "",
      msg.message.replace(/"/g, '""'), // Escape quotes
      msg.status,
      msg.replies.length.toString(),
    ]);

    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    return {
      data: csvContent,
      filename: `contact-messages-${new Date().toISOString().split("T")[0]}.csv`,
      contentType: "text/csv",
    };
  } catch (error) {
    console.error("Error exporting messages:", error);
    throw new Error("Failed to export messages");
  }
}
