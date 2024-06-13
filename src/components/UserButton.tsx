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

interface UserButtonProps {
  user: User;
}

export default async function UserButton({ user }: UserButtonProps) {
  const { hasAccess } = await checkAdminAccess();

  if (!hasAccess) {
    return null;
  }

  return (
    <DropdownMenu>
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
            <Link href="/settings">
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          {/* TODO: Show this only for admins */}
          <DropdownMenuItem asChild>
            {hasAccess && (
              <Link href="/admin">
                <Lock className="w-4 h-4 mr-2" />
                Admin
              </Link>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* TODO: Add a logout functionality */}
          <button className="flex items-center w-full">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
