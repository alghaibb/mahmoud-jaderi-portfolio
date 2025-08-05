"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Search,
  Reply,
  Eye,
  LogOut,
  Shield,
  Users,
  TrendingUp,
  Home,
  Filter,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Archive,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { toast } from "sonner";
import { adminLogout } from "../../login/actions";
import { ContactMessage, ContactReply } from "@/generated/prisma";
import {
  getContactMessages,
  replyToMessage,
  updateMessageStatus,
  getAdminAnalytics,
  bulkUpdateMessageStatus,
  deleteMessage,
  exportMessages,
} from "../actions";

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

export function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessageWithReplies[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<
    ContactMessageWithReplies[]
  >([]);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessageWithReplies | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    loadMessages();
    loadAnalytics();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, statusFilter]);

  const loadMessages = async () => {
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const data = await getAdminAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Error loading analytics:", error);
      toast.error("Failed to load analytics");
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((message) => message.status === statusFilter);
    }

    setFilteredMessages(filtered);
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    startTransition(async () => {
      try {
        await replyToMessage(selectedMessage.id, replyText);
        toast.success("Reply sent successfully!");
        setReplyDialogOpen(false);
        setReplyText("");
        setSelectedMessage(null);
        loadMessages();
      } catch (error) {
        console.error("Error sending reply:", error);
        toast.error("Failed to send reply");
      }
    });
  };

  const handleStatusUpdate = async (messageId: string, status: string) => {
    startTransition(async () => {
      try {
        await updateMessageStatus(messageId, status);
        toast.success("Status updated successfully!");
        loadMessages();
      } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Failed to update status");
      }
    });
  };

  const handleBulkStatusUpdate = async (status: string) => {
    if (selectedMessages.length === 0) {
      toast.error("No messages selected");
      return;
    }

    startTransition(async () => {
      try {
        await bulkUpdateMessageStatus(selectedMessages, status);
        await loadMessages();
        await loadAnalytics();
        setSelectedMessages([]);
        setShowBulkActions(false);
        toast.success(`Updated ${selectedMessages.length} messages`);
      } catch (error) {
        console.error("Error bulk updating messages:", error);
        toast.error("Failed to update messages");
      }
    });
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this message? This action cannot be undone."
      )
    ) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteMessage(messageId);
        await loadMessages();
        await loadAnalytics();
        toast.success("Message deleted successfully");
      } catch (error) {
        console.error("Error deleting message:", error);
        toast.error("Failed to delete message");
      }
    });
  };

  const handleExportMessages = async (format: "csv" | "json") => {
    try {
      const result = await exportMessages(format);

      // Create download link
      const blob = new Blob([result.data], { type: result.contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = result.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`Messages exported as ${format.toUpperCase()}`);
    } catch (error) {
      console.error("Error exporting messages:", error);
      toast.error("Failed to export messages");
    }
  };

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages((prev) =>
      prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId]
    );
  };

  const selectAllMessages = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map((m) => m.id));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      UNREAD: { variant: "destructive" as const, label: "Unread" },
      READ: { variant: "secondary" as const, label: "Read" },
      REPLIED: { variant: "default" as const, label: "Replied" },
      ARCHIVED: { variant: "outline" as const, label: "Archived" },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.UNREAD;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

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

  const recentActivity = messages
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "REPLIED":
        return CheckCircle;
      case "UNREAD":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "REPLIED":
        return "text-green-600 bg-green-50 dark:bg-green-950/50";
      case "UNREAD":
        return "text-red-600 bg-red-50 dark:bg-red-950/50";
      default:
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Modern Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold tracking-tight">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">
                  Manage contact messages
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:flex"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="sm:hidden">
                <Link href="/">
                  <Home className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => adminLogout()}
                className="border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="sm:col-span-1 lg:col-span-1 xl:col-span-1"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Total Messages
                    </p>
                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                      {stats.total}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="sm:col-span-1 lg:col-span-1 xl:col-span-1"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                      Unread
                    </p>
                    <p className="text-3xl font-bold text-red-900 dark:text-red-100">
                      {stats.unread}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="sm:col-span-1 lg:col-span-1 xl:col-span-1"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      Replied
                    </p>
                    <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                      {stats.replied}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="sm:col-span-1 lg:col-span-1 xl:col-span-1"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      This Week
                    </p>
                    <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                      {stats.recent}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="sm:col-span-1 lg:col-span-1 xl:col-span-1"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      Response Rate
                    </p>
                    <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                      {stats.responseRate}%
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="sm:col-span-1 lg:col-span-1 xl:col-span-1"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/50 dark:to-teal-900/30 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
                      Avg Response
                    </p>
                    <p className="text-2xl font-bold text-teal-900 dark:text-teal-100">
                      {stats.avgResponseTime}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="border-0 shadow-lg h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((message) => {
                      const StatusIcon = getStatusIcon(message.status);
                      return (
                        <div
                          key={message.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div
                            className={`p-1 rounded-full ${getStatusColor(message.status)}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {message.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {message.subject || "No subject"}
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No recent activity</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-lg h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" onClick={loadMessages}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors cursor-pointer">
                    <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">All Messages</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {stats.total}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors cursor-pointer">
                    <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Need Reply</p>
                    <p className="text-2xl font-bold text-red-600">
                      {stats.unread}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors cursor-pointer">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Completed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {stats.replied}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-colors cursor-pointer">
                    <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">This Week</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {stats.recent}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Search and Filter - Mobile Optimized */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Messages</CardTitle>
                <CardDescription>
                  Search and filter your contact messages
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages by name, email, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 border-0 bg-muted/50 focus:bg-background transition-colors"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-11 border-0 bg-muted/50 focus:bg-background transition-colors">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="UNREAD">Unread</SelectItem>
                  <SelectItem value="READ">Read</SelectItem>
                  <SelectItem value="REPLIED">Replied</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Messages List - Mobile First Design */}
        <div className="space-y-4">
          {loading ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading messages...</p>
              </CardContent>
            </Card>
          ) : filteredMessages.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No messages found</p>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-background via-background to-muted/10 group-hover:from-primary/5 group-hover:to-primary/10 relative overflow-hidden">
                  {/* Priority Indicator */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      message.status === "UNREAD"
                        ? "bg-red-500"
                        : message.status === "READ"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />

                  <CardContent className="p-6 pl-8">
                    <div className="space-y-6">
                      {/* Enhanced Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors">
                              <Users className="h-6 w-6 text-primary" />
                            </div>
                            {message.status === "UNREAD" && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                                {message.name}
                              </h3>
                              {message.status === "REPLIED" && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              <span className="font-medium">
                                {message.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {getStatusBadge(message.status)}
                          <Select
                            value={message.status}
                            onValueChange={(value) =>
                              handleStatusUpdate(message.id, value)
                            }
                          >
                            <SelectTrigger className="w-36 h-9 text-xs border-border/50 hover:border-primary/50 transition-colors">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UNREAD">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4 text-red-500" />
                                  Unread
                                </div>
                              </SelectItem>
                              <SelectItem value="READ">
                                <div className="flex items-center gap-2">
                                  <Eye className="h-4 w-4 text-yellow-500" />
                                  Read
                                </div>
                              </SelectItem>
                              <SelectItem value="REPLIED">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  Replied
                                </div>
                              </SelectItem>
                              <SelectItem value="ARCHIVED">
                                <div className="flex items-center gap-2">
                                  <Archive className="h-4 w-4 text-gray-500" />
                                  Archived
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Enhanced Subject */}
                      {message.subject && (
                        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            <span className="text-xs font-medium text-primary uppercase tracking-wide">
                              Subject
                            </span>
                          </div>
                          <p className="font-semibold text-foreground text-lg">
                            {message.subject}
                          </p>
                        </div>
                      )}

                      {/* Enhanced Meta Info */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm">
                        {message.phone && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                            <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-medium text-blue-700 dark:text-blue-300">
                              {message.phone}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200/50 dark:border-green-800/50">
                          <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <span className="font-medium text-green-700 dark:text-green-300">
                            {new Date(message.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Enhanced Message Preview */}
                      <div className="bg-gradient-to-r from-muted/50 to-muted/20 rounded-xl p-4 border border-border/50">
                        <div className="flex items-center gap-2 mb-3">
                          <MessageSquare className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-primary uppercase tracking-wide">
                            Message
                          </span>
                        </div>
                        <p className="text-foreground leading-relaxed">
                          {message.message}
                        </p>
                      </div>

                      {/* Replies */}
                      {message.replies.length > 0 && (
                        <div className="bg-muted/30 rounded-lg p-3">
                          <p className="text-sm font-medium mb-2 text-foreground">
                            Replies ({message.replies.length})
                          </p>
                          {message.replies.map((reply, replyIndex) => (
                            <div
                              key={reply.id}
                              className="text-sm text-muted-foreground"
                            >
                              <p className="mb-1">
                                <span className="font-medium">
                                  Reply {replyIndex + 1}:
                                </span>{" "}
                                {reply.message}
                              </p>
                              <p className="text-xs">
                                {new Date(reply.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Enhanced Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-border/50">
                        <Dialog
                          open={viewDialogOpen}
                          onOpenChange={setViewDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMessage(message)}
                              className="flex-1 sm:flex-none group border-blue-200/50 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200"
                            >
                              <Eye className="h-4 w-4 mr-2 group-hover:text-blue-600 transition-colors" />
                              <span className="group-hover:text-blue-600 transition-colors">
                                View Details
                              </span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Message Details</DialogTitle>
                              <DialogDescription>
                                From {selectedMessage?.name} (
                                {selectedMessage?.email})
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Subject</h4>
                                <p className="text-sm text-muted-foreground">
                                  {selectedMessage?.subject || "No subject"}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Message</h4>
                                <p className="text-sm whitespace-pre-wrap">
                                  {selectedMessage?.message}
                                </p>
                              </div>
                              {selectedMessage?.phone && (
                                <div>
                                  <h4 className="font-medium mb-2">Phone</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedMessage.phone}
                                  </p>
                                </div>
                              )}
                              <div>
                                <h4 className="font-medium mb-2">Date</h4>
                                <p className="text-sm text-muted-foreground">
                                  {selectedMessage &&
                                    new Date(
                                      selectedMessage.createdAt
                                    ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => {
                            setSelectedMessage(message);
                            setReplyDialogOpen(true);
                          }}
                          className="flex-1 sm:flex-none group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <Reply className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                          <span>Reply</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>
              Send a reply to {selectedMessage?.name} ({selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Original Message</h4>
              <div className="bg-muted/50 rounded-lg p-3 text-sm max-h-32 overflow-y-auto">
                <p className="whitespace-pre-wrap">
                  {selectedMessage?.message}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Your Reply</h4>
              <Textarea
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                className="min-h-[100px] resize-none"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setReplyDialogOpen(false);
                  setReplyText("");
                  setSelectedMessage(null);
                }}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <LoadingButton
                onClick={handleReply}
                loading={isPending}
                loadingText="Sending..."
                disabled={!replyText.trim()}
                className="w-full sm:w-auto"
              >
                Send Reply
              </LoadingButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
