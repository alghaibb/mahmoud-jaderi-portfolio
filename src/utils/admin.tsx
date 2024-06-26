import React from "react";
import { auth } from "../auth";
import { getUserByEmail } from "../utils/user";

export async function checkAdminAccess() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email ?? "");

  if (!user || user.role !== "ADMIN") {
    return {
      hasAccess: false,
      component: (
        <div className="mt-6 flex h-screen flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-4xl font-bold uppercase">Access Denied</h1>
          <p className="text-muted-foreground">You shall not pass!</p>
        </div>
      ),
    };
  }

  return { hasAccess: true, email: user.email };
}
