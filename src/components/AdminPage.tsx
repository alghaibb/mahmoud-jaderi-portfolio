import { Metadata } from "next";
import { auth } from "@/auth";
import { getUserByEmail } from "@/utils/user";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const session = await auth();
  const user = await getUserByEmail(session?.user.email ?? "");

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="flex flex-col items-center justify-center h-screen mt-6 space-y-4 text-center">
        <h1 className="text-4xl font-bold uppercase">Access Denied</h1>
        <p className="text-muted-foreground">You shall not pass!</p>
      </div>
    );
  }

  return (
    <section className="mx-auto my-10 space-y-3">
      <h1 className="text-xl font-bold text-center">Admin Page</h1>
      <p className="text-center">Welcome, admin!</p>
    </section>
  );
}
