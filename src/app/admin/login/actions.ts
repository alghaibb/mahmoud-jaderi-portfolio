"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
      return { error: "Admin password not configured" };
    }

    if (validatedData.password !== adminPassword) {
      return { error: "Invalid admin password" };
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
    console.error("Admin login error:", error);
    return { error: "Failed to login" };
  }
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
  redirect("/admin/login");
}

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin-session");

  if (!adminSession || adminSession.value !== "authenticated") {
    redirect("/admin/login");
  }

  return true;
} 