import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const AdminBanner = async ({ email }: { email: string }) => {
  return (
    <div className="flex flex-col items-start justify-start bg-primary/10 p-4 text-xs">
      <p>Welcome {email}</p>
      <Link href="/admin">
        <Button variant="link" className="px-0" size="xs">
          Click here
        </Button>{" "}
        <span>to visit your admin dashboard</span>
      </Link>
    </div>
  );
};

export default AdminBanner;
