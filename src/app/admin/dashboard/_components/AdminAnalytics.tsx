"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
} from "lucide-react";
import { useAdmin } from "./AdminContext";

export function AdminAnalytics() {
  const { state } = useAdmin();
  const { analytics, messages, loading } = state;

  // Show loading state to prevent hydration mismatch
  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Analytics Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-20 bg-muted animate-pulse rounded" />
              <div className="h-6 w-24 bg-muted animate-pulse rounded" />
              <div className="h-6 w-28 bg-muted animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-3 w-12 bg-muted animate-pulse rounded" />
                    <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Enhanced analytics with server data
  const stats = analytics
    ? {
        total: analytics.totalMessages,
        unread: analytics.unreadMessages,
        replied: analytics.repliedMessages,
        read: analytics.readMessages,
        recent: analytics.recentMessages,
        responseRate: analytics.responseRate,
        avgResponseTime:
          analytics.avgResponseTimeHours > 0
            ? `${analytics.avgResponseTimeHours}h`
            : "< 1h",
      }
    : {
        total: messages.length,
        unread: messages.filter((m) => m.status === "UNREAD").length,
        replied: messages.filter((m) => m.status === "REPLIED").length,
        read: messages.filter((m) => m.status === "READ").length,
        recent: messages.filter((m) => {
          const messageDate = new Date(m.createdAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return messageDate >= weekAgo;
        }).length,
        responseRate:
          messages.length > 0
            ? Math.round(
                (messages.filter((m) => m.status === "REPLIED").length /
                  messages.length) *
                  100
              )
            : 0,
        avgResponseTime: "< 24h",
      };

  return (
    <div className="space-y-6">
      {/* Analytics Summary Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Analytics Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant={stats.unread > 0 ? "destructive" : "secondary"}>
              {stats.unread} Unread
            </Badge>
            <Badge variant="default">{stats.responseRate}% Response Rate</Badge>
            <Badge variant="outline">
              {stats.avgResponseTime} Avg Response
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                  Total
                </p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {stats.total}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-red-700 dark:text-red-300 uppercase tracking-wide">
                  Unread
                </p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {stats.unread}
                </p>
              </div>
              <div className="relative">
                <MessageSquare className="h-8 w-8 text-red-600" />
                {stats.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-green-700 dark:text-green-300 uppercase tracking-wide">
                  Replied
                </p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {stats.replied}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                  Recent
                </p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {stats.recent}
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                  Response Rate
                </p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {stats.responseRate}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                  Avg Response
                </p>
                <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
                  {stats.avgResponseTime}
                </p>
              </div>
              <Clock className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
