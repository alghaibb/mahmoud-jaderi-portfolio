import { AdminLoginForm } from "./_components/AdminLoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Access the admin dashboard to manage contact messages.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <AdminLoginForm />
      </div>
    </div>
  );
}
