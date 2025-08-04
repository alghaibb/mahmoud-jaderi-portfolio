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
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";
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

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-background" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Manage contact messages
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
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
              <Button variant="outline" size="sm" onClick={() => adminLogout()}>
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{stats.total}</CardTitle>
                    <CardDescription>Total Messages</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{stats.unread}</CardTitle>
                    <CardDescription>Unread</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{stats.replied}</CardTitle>
                    <CardDescription>Replied</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-card border-border">
          <CardHeader>
            <CardTitle>Filter Messages</CardTitle>
            <CardDescription>
              Search and filter your contact messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
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

        {/* Messages List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-border mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading messages...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <CardDescription>No messages found</CardDescription>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{message.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {message.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(message.status)}
                            <Select
                              value={message.status}
                              onValueChange={(value) =>
                                handleStatusUpdate(message.id, value)
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="UNREAD">Unread</SelectItem>
                                <SelectItem value="READ">Read</SelectItem>
                                <SelectItem value="REPLIED">Replied</SelectItem>
                                <SelectItem value="ARCHIVED">
                                  Archived
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {message.subject && (
                          <div>
                            <p className="font-medium">
                              Subject: {message.subject}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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

                        <div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {message.message}
                          </p>
                        </div>

                        {message.replies.length > 0 && (
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm font-medium mb-2">
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
                                  {new Date(
                                    reply.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                                                 <ResponsiveModal>
                           <ResponsiveModalTrigger asChild>
                             <Button variant="outline" size="sm">
                               <Eye className="h-4 w-4 mr-2" />
                               View
                             </Button>
                           </ResponsiveModalTrigger>
                           <ResponsiveModalContent className="w-[95vw] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border mx-auto">
                            <ResponsiveModalHeader>
                              <ResponsiveModalTitle>
                                Message Details
                              </ResponsiveModalTitle>
                              <ResponsiveModalDescription>
                                From {message.name} ({message.email})
                              </ResponsiveModalDescription>
                            </ResponsiveModalHeader>
                            <div className="space-y-4 p-6">
                              <div>
                                <h4 className="font-medium mb-2">Subject</h4>
                                <p className="text-sm text-muted-foreground">
                                  {message.subject || "No subject"}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Message</h4>
                                <p className="text-sm whitespace-pre-wrap">
                                  {message.message}
                                </p>
                              </div>
                              {message.phone && (
                                <div>
                                  <h4 className="font-medium mb-2">Phone</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {message.phone}
                                  </p>
                                </div>
                              )}
                              <div>
                                <h4 className="font-medium mb-2">Date</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(message.createdAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </ResponsiveModalContent>
                        </ResponsiveModal>

                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => {
                            setSelectedMessage(message);
                            setReplyDialogOpen(true);
                          }}
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

      {/* Reply Modal */}
             <ResponsiveModal open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
         <ResponsiveModalContent className="w-[95vw] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border mx-auto">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle>Reply to Message</ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Send a reply to {selectedMessage?.name} ({selectedMessage?.email})
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <div className="space-y-4 p-6">
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
                className="min-h-[100px]"
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
                 className="w-full sm:w-auto order-2 sm:order-1"
               >
                 Cancel
               </Button>
               <LoadingButton
                 onClick={handleReply}
                 loading={isPending}
                 loadingText="Sending..."
                 disabled={!replyText.trim()}
                 className="w-full sm:w-auto order-1 sm:order-2"
               >
                 Send Reply
               </LoadingButton>
             </div>
          </div>
        </ResponsiveModalContent>
      </ResponsiveModal>
    </div>
  );
}
