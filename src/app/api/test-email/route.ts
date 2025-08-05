import { NextResponse } from "next/server";
import { Resend } from "resend";
import { env } from "@/lib/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function GET() {
  try {
    // Test email sending with detailed error info
    const result = await resend.emails.send({
      from: "Mahmoud Jaderi <noreply@codewithmj.com>",
      to: "test@example.com", // This will fail but show us the error
      subject: "Test Email",
      html: "<p>This is a test email</p>",
    });

    return NextResponse.json({
      success: true,
      result,
      apiKeyExists: !!env.RESEND_API_KEY,
      apiKeyLength: env.RESEND_API_KEY?.length || 0,
    });
  } catch (error) {
    console.error("Test email error:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      apiKeyExists: !!env.RESEND_API_KEY,
      apiKeyLength: env.RESEND_API_KEY?.length || 0,
      errorDetails: error,
    }, { status: 500 });
  }
}