"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone, Calendar, MessageSquare } from "lucide-react";
import { ContactMessage, ContactReply } from "@/generated/prisma";

type ContactMessageWithReplies = ContactMessage & {
  replies: ContactReply[];
};
import { marked } from "marked";
import { useMemo } from "react";

interface ViewMessageModalProps {
  message: ContactMessageWithReplies;
  trigger?: React.ReactNode;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "unread":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "read":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "replied":
      return "bg-green-100 text-green-800 border-green-200";
    case "archived":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function ViewMessageModal({
  message,
  trigger,
}: ViewMessageModalProps) {
  // Convert markdown replies to HTML
  const repliesWithHtml = useMemo(() => {
    return (
      message.replies?.map((reply) => ({
        ...reply,
        htmlMessage: marked(reply.message),
      })) || []
    );
  }, [message.replies]);
  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Eye className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-xl font-semibold">
              Message Details
            </DialogTitle>
            <Badge className={getStatusColor(message.status)}>
              {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
            </Badge>
          </div>
          <DialogDescription className="sr-only">
            View full message details from {message.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span className="break-all">{message.email}</span>
              </div>
              {message.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span>{message.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Received:</span>
                <span>{new Date(message.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Subject</h3>
            <p className="text-sm bg-muted/30 rounded-lg p-3">
              {message.subject}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Message</h3>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {message.message}
              </p>
            </div>
          </div>

          {message.replies && message.replies.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">
                Replies ({message.replies.length})
              </h3>
              <div className="space-y-4">
                {repliesWithHtml.map((reply) => (
                  <div
                    key={reply.id}
                    className="bg-primary/5 border-l-4 border-primary rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Admin Reply</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(reply.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div
                      className="text-sm leading-relaxed prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
                      dangerouslySetInnerHTML={{ __html: reply.htmlMessage }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
