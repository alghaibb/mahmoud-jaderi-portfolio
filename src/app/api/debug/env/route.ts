import { NextResponse } from "next/server";

export async function GET() {
  // Only allow in development or with special header
  if (process.env.NODE_ENV === "production" && 
      !process.env.DEBUG_MODE) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL ? 
      process.env.DATABASE_URL.replace(/:[^:@]*@/, ':***@') : 'NOT SET',
    DIRECT_URL: process.env.DIRECT_URL ? 
      process.env.DIRECT_URL.replace(/:[^:@]*@/, ':***@') : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}