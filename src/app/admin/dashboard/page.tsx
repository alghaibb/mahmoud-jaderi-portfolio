import { checkAdminAuth } from "../login/actions";
import { AdminDashboardRefactored } from "./_components/AdminDashboardRefactored";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage contact messages and portfolio administration.",
};

export default async function AdminDashboardPage() {
  // Check authentication
  await checkAdminAuth();

  return <AdminDashboardRefactored />;
}
