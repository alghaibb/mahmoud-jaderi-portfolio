import { useState, useEffect } from "react";
import { getContactMessages, getAdminAnalytics } from "@/app/admin/dashboard/actions";
import { ContactMessage, ContactReply } from "@/generated/prisma";
import { useDataRefresh } from "@/contexts/DataRefreshContext";

type ContactMessageWithReplies = ContactMessage & {
  replies: ContactReply[];
};

type AdminAnalytics = {
  totalMessages: number;
  unreadMessages: number;
  repliedMessages: number;
  readMessages: number;
  recentMessages: number;
  avgResponseTimeHours: number;
  responseRate: number;
};

export function useAdminAnalytics() {
  const [messages, setMessages] = useState<ContactMessageWithReplies[]>([]);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshTrigger } = useDataRefresh();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [messagesData, analyticsData] = await Promise.all([
          getContactMessages(),
          getAdminAnalytics()
        ]);
        setMessages(messagesData as ContactMessageWithReplies[]);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error("Error loading analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [refreshTrigger]);

  // Calculate stats from messages if analytics is not available
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

  return {
    stats,
    loading,
    analytics,
    messages
  };
}
