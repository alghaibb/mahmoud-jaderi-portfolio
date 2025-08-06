import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { checkAdminAuth } from "@/app/admin/login/actions";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin (optional - you can remove this for testing)
    await checkAdminAuth();

    const { to } = await request.json();

    console.log("Testing email configuration:", {
      apiKeyExists: !!env.RESEND_API_KEY,
      apiKeyLength: env.RESEND_API_KEY?.length || 0,
      environment: process.env.NODE_ENV,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    });

    const result = await resend.emails.send({
      from: "Mahmoud Jaderi <mahmoud_jaderi@codewithmj.com>",
      to: to || "test@example.com",
      subject: "Email Configuration Test",
      html: `
        <h2>Email Test</h2>
        <p>This is a test email to verify Resend configuration.</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV}</p>
        <p><strong>Base URL:</strong> ${process.env.NEXT_PUBLIC_BASE_URL}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    });

    console.log("Email sent successfully:", result);

    return NextResponse.json({
      success: true,
      result,
      environment: process.env.NODE_ENV,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    });
  } catch (error) {
    console.error("Email test failed:", error);
    console.error("Error details:", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      apiKeyExists: !!env.RESEND_API_KEY,
      apiKeyLength: env.RESEND_API_KEY?.length || 0,
      environment: process.env.NODE_ENV,
    });

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        environment: process.env.NODE_ENV,
      },
      { status: 500 }
    );
  }
}
