import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  // Only allow in development or with special debug header
  const isDev = process.env.NODE_ENV === "development";
  
  if (!isDev) {
    return NextResponse.json({ error: "Not allowed in production" }, { status: 403 });
  }

  try {
    return NextResponse.json({
      hasAdminPassword: !!process.env.ADMIN_PASSWORD,
      adminPasswordLength: process.env.ADMIN_PASSWORD?.length || 0,
      nodeEnv: process.env.NODE_ENV,
      envLoaded: !!env.ADMIN_PASSWORD,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      error: "Environment check failed",
      details: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}