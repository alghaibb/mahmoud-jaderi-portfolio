"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Reply,
  Eye,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useAdmin, type ContactMessageWithReplies } from "./AdminContext";
import DeleteMessageModal from "./DeleteMessageModal";
import ViewMessageModal from "./ViewMessageModal";
import ReplyMessageModal from "./ReplyMessageModal";

function MessageCard({
  message,
  index,
}: {
  message: ContactMessageWithReplies;
  index: number;
}) {
  const { state, actions } = useAdmin();
  const { selectedMessages, showBulkActions } = state;

  const isSelected = selectedMessages.includes(message.id);

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

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
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
                {showBulkActions && (
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() =>
                      actions.toggleMessageSelection(message.id)
                    }
                    className="mt-1"
                  />
                )}

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
                    {message.replies.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Reply className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">
                          Replied
                        </span>
                      </div>
                    )}
                  </div>

                  {message.subject && (
                    <p className="font-semibold text-foreground">
                      {message.subject}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{message.email}</span>
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>{message.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatDate(message.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getStatusBadge(message.status)}
              </div>
            </div>

            {/* Message Preview */}
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {message.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <ViewMessageModal
                message={message}
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none border-border/50 hover:border-primary/50 hover:bg-primary/5"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                }
              />

              <ReplyMessageModal
                message={message}
                trigger={
                  <Button
                    size="sm"
                    className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                  >
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                }
              />

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <DeleteMessageModal message={message} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function MessageList() {
  const { state } = useAdmin();
  const { filteredMessages, loading } = state;

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
                <div className="h-20 bg-muted rounded" />
                <div className="flex gap-2">
                  <div className="h-8 bg-muted rounded w-24" />
                  <div className="h-8 bg-muted rounded w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredMessages.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            No messages found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters to find messages.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {filteredMessages.map((message, index) => (
        <MessageCard key={message.id} message={message} index={index} />
      ))}
    </div>
  );
}
