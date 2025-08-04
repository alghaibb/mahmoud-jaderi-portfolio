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
  MoreHorizontal,
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
} from "../actions";

type ContactMessageWithReplies = ContactMessage & {
  replies: ContactReply[];
};

export function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessageWithReplies[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<
    ContactMessageWithReplies[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessageWithReplies | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    loadMessages();
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

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => m.status === "UNREAD").length,
    replied: messages.filter((m) => m.status === "REPLIED").length,
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
        {/* Stats Cards - Mobile First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30">
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
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30">
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
            className="sm:col-span-2 lg:col-span-1"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30">
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
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
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
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 group">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">
                              {message.name}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {message.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {getStatusBadge(message.status)}
                          <Select
                            value={message.status}
                            onValueChange={(value) =>
                              handleStatusUpdate(message.id, value)
                            }
                          >
                            <SelectTrigger className="w-32 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UNREAD">Unread</SelectItem>
                              <SelectItem value="READ">Read</SelectItem>
                              <SelectItem value="REPLIED">Replied</SelectItem>
                              <SelectItem value="ARCHIVED">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Subject */}
                      {message.subject && (
                        <div>
                          <p className="font-medium text-foreground">
                            {message.subject}
                          </p>
                        </div>
                      )}

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {message.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>{message.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Message Preview */}
                      <div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
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

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Dialog
                          open={viewDialogOpen}
                          onOpenChange={setViewDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMessage(message)}
                              className="flex-1 sm:flex-none"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
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
                          className="flex-1 sm:flex-none"
                        >
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
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
