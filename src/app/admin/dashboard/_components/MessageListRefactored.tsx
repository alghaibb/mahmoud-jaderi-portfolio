"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Reply,
  Eye,
  Users,
  Search,
} from "lucide-react";
import { motion } from "motion/react";
import { useFilter } from "@/contexts/FilterContext";
import { useSelection } from "@/contexts/SelectionContext";
import { useMessageFilter } from "@/hooks/useMessageFilter";
import { useBulkActions } from "@/hooks/useBulkActions";
import { getContactMessages, bulkUpdateMessageStatus } from "../actions";
import { useDataRefresh } from "@/contexts/DataRefreshContext";
import DeleteMessageModal from "./DeleteMessageModal";
import ViewMessageModal from "./ViewMessageModal";
import ReplyMessageModal from "./ReplyMessageModal";
import { toast } from "sonner";
import { ContactMessage, ContactReply } from "@/generated/prisma";

type ContactMessageWithReplies = ContactMessage & {
  replies: ContactReply[];
};

function MessageCard({
  message,
  index,
}: {
  message: ContactMessageWithReplies;
  index: number;
}) {
  const { toggleItem, isSelected } = useSelection();
  const selected = isSelected(message.id);

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
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card
        className={`transition-all duration-200 hover:shadow-md ${selected ? "ring-2 ring-primary" : ""}`}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Checkbox
              checked={selected}
              onCheckedChange={() => toggleItem(message.id)}
              className="mt-1"
            />

            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-semibold truncate">
                      {message.name}
                    </span>
                    {getStatusBadge(message.status)}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{message.email}</span>
                  </div>

                  {message.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{message.phone}</span>
                    </div>
                  )}

                  <h3 className="font-medium text-base mb-2 line-clamp-1">
                    {message.subject}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.message}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(message.createdAt)}</span>
                  </div>

                  <div className="flex gap-1">
                    <ViewMessageModal
                      message={message}
                      trigger={
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      }
                    />

                    <ReplyMessageModal
                      message={message}
                      trigger={
                        <Button variant="ghost" size="sm">
                          <Reply className="h-4 w-4" />
                        </Button>
                      }
                    />

                    <DeleteMessageModal
                      message={message}
                      trigger={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function FilterControls() {
  const { filters, setSearchTerm, setStatusFilter, setDateFilter } =
    useFilter();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={filters.searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={filters.statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="UNREAD">Unread</SelectItem>
          <SelectItem value="READ">Read</SelectItem>
          <SelectItem value="REPLIED">Replied</SelectItem>
          <SelectItem value="ARCHIVED">Archived</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.dateFilter} onValueChange={setDateFilter}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filter by date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function BulkActions() {
  const { selectedItems, getSelectedCount, deselectAll } = useSelection();
  const { triggerRefresh } = useDataRefresh();
  const { bulkUpdate, isPending } = useBulkActions({
    onSuccess: async () => {
      // Trigger data refresh instead of page reload
      triggerRefresh();
    },
  });

  if (selectedItems.length === 0) return null;

  const handleBulkStatusUpdate = async (status: string) => {
    await bulkUpdate(async (selectedIds) => {
      await bulkUpdateMessageStatus(selectedIds, status);
    }, `Updated ${getSelectedCount()} messages to ${status.toLowerCase()}`);
  };

  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            {getSelectedCount()} messages selected
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={deselectAll}
            disabled={isPending}
          >
            Clear Selection
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => handleBulkStatusUpdate("READ")}
            disabled={isPending}
          >
            Mark as Read
          </Button>
          <Button
            size="sm"
            onClick={() => handleBulkStatusUpdate("ARCHIVED")}
            disabled={isPending}
          >
            Archive
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MessageListRefactored() {
  const [messages, setMessages] = useState<ContactMessageWithReplies[]>([]);
  const [loading, setLoading] = useState(true);
  const { filteredMessages } = useMessageFilter(messages);
  const { selectAll, deselectAll, selectedItems } = useSelection();
  const { refreshTrigger } = useDataRefresh();

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await getContactMessages();
      setMessages(data as ContactMessageWithReplies[]);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [refreshTrigger]);

  const handleSelectAll = () => {
    if (selectedItems.length === filteredMessages.length) {
      deselectAll();
    } else {
      selectAll(filteredMessages.map((msg) => msg.id));
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-1/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <FilterControls />
      <BulkActions />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">
            Messages ({filteredMessages.length})
          </h3>
          <Checkbox
            checked={
              selectedItems.length === filteredMessages.length &&
              filteredMessages.length > 0
            }
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-muted-foreground">Select All</span>
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No messages found</h3>
              <p className="text-muted-foreground">
                {messages.length === 0
                  ? "No messages have been received yet."
                  : "Try adjusting your filters to see more messages."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message, index) => (
            <MessageCard key={message.id} message={message} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
