import { checkAdminAuth } from "../login/actions";
import { AdminDashboard } from "./_components/AdminDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage contact messages and portfolio administration.",
};

export default async function AdminDashboardPage() {
  // Check authentication
  await checkAdminAuth();

  return (
    <div className="min-h-screen bg-background">
      <AdminDashboard />
    </div>
  );
}
