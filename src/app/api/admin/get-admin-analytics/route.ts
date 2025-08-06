import prisma from "@/lib/prisma";
import { checkAdminAuth } from "@/app/admin/login/actions";
import { NextResponse } from "next/server";

export async function GET() {
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

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentMessages = await prisma.contactMessage.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

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
      avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    }

    return NextResponse.json({
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
    });
  } catch (error) {
    console.error("Error fetching admin analytics:", error);

    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}