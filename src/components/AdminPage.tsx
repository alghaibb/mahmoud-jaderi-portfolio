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
    <section className="mx-auto my-10 space-y-3">
      <h1 className="text-xl font-bold text-center">Admin Page</h1>
      <p className="text-center">Welcome, admin!</p>
    </section>
  );
}
