import prisma from "@/lib/prisma";
import { checkAdminAuth } from "@/app/admin/login/actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);

    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}