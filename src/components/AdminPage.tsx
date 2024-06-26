import { Metadata } from "next";
import { checkAdminAccess } from "@/utils/admin";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const { hasAccess, component } = await checkAdminAccess();

  if (!hasAccess) {
    return component;
  }

  return (
    <section className="mx-auto my-10 h-screen space-y-3">
      <h1 className="text-center text-xl font-bold">Admin Page</h1>
      <p className="text-center">Welcome, admin!</p>
    </section>
  );
}
