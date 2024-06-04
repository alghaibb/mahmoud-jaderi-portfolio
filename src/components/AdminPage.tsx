import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  // TODO: Redirect non-admin users

  return (
    <main className="mx-auto my-10 space-y-3">
      <h1 className="text-xl font-bold text-center">Admin Page</h1>
      <p className="text-center">Welcome, admin!</p>
    </main>
  );
}
