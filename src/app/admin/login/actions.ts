"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { env } from "@/lib/env";

const adminLoginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export async function adminLogin(data: { password: string }) {
  try {
    const validatedData = adminLoginSchema.parse(data);

    // Check against environment variable
    const adminPassword = env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD environment variable not set");
      throw new Error("Admin password not configured - check environment variables");
    }

    if (validatedData.password !== adminPassword) {
      console.error("Invalid admin password attempt");
      throw new Error("Invalid admin password");
    }

    // Set admin session cookie (7 days)
    const cookieStore = await cookies();
    cookieStore.set("admin-session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    redirect("/admin/dashboard");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Admin login error:", error);
    throw error;
  }
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
  redirect("/admin/login");
}

export async function checkAdminAuth() {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin-session");

    if (!adminSession || adminSession.value !== "authenticated") {
      redirect("/admin/login");
    }

    return true;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Authentication check error:", error);
    redirect("/admin/login");
  }
} 