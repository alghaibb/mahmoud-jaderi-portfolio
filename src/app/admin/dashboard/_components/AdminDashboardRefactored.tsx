"use client";

import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import Link from "next/link";
import { adminLogout } from "../../login/actions";
import { AdminProvider } from "./AdminContext";
import { AdminAnalytics } from "./AdminAnalytics";
import { AdminControls } from "./AdminControls";
import { MessageList } from "./MessageList";

function AdminHeader() {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border/50 sticky top-0 z-40 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white font-bold text-sm sm:text-lg">A</span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent truncate">
                Admin Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden xs:block">
                Contact Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 sm:flex-none"
            >
              <Link href="/">
                <Home className="h-4 w-4 sm:mr-2" />
                <span className="hidden xs:inline sm:inline">Home</span>
              </Link>
            </Button>

            <form action={adminLogout} className="flex-1 sm:flex-none">
              <Button
                variant="destructive"
                size="sm"
                type="submit"
                className="w-full"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden xs:inline sm:inline">Logout</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboardContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <AdminHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <AdminAnalytics />
        <AdminControls />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Messages</h2>
          </div>
          <MessageList />
        </div>
      </div>
    </div>
  );
}

export function AdminDashboardRefactored() {
  return (
    <AdminProvider>
      <AdminDashboardContent />
    </AdminProvider>
  );
}
