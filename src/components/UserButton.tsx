import avatarPlaceholder from "@/assets/images/avatar_placeholder.png";
import { LogOut, Settings, Lock } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { checkAdminAccess } from "@/utils/admin";
import { signOut } from "@/auth";

interface UserButtonProps {
  user: User;
}

export default async function UserButton({ user }: UserButtonProps) {
  const { hasAccess } = await checkAdminAccess();

  if (!hasAccess) {
    return null;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="flex-none rounded-full">
          <Image
            src={user.image || avatarPlaceholder}
            alt="User profile picture"
            width={50}
            height={50}
            className="object-cover rounded-full aspect-square bg-background"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <Settings className="w-4 h-4 mr-2 cursor-pointer" />
              <span className="cursor-pointer">Profile</span>
            </Link>
          </DropdownMenuItem>
          {hasAccess && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Lock className="w-4 h-4 mr-2 cursor-pointer" />
                <span className="cursor-pointer">Admin</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button
              type="submit"
              size="sm"
              className="flex items-center px-0 mt-0 border-t rounded-none border-muted-foreground/30"
              variant="ghost"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
