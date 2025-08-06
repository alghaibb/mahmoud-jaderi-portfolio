"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { LoadingButton } from "@/components/ui/loading-button";
import { Reply, Mail, MessageSquare } from "lucide-react";
import { useState, useTransition } from "react";
import { ContactMessage, ContactReply } from "@/generated/prisma";
import { replyToMessage } from "../actions";
import { toast } from "sonner";
import { useDataRefresh } from "@/contexts/DataRefreshContext";

type ContactMessageWithReplies = ContactMessage & {
  replies: ContactReply[];
};

interface ReplyMessageModalProps {
  message: ContactMessageWithReplies;
  trigger?: React.ReactNode;
}

export default function ReplyMessageModal({
  message,
  trigger,
}: ReplyMessageModalProps) {
  const [isPending, startTransition] = useTransition();
  const [replyText, setReplyText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { triggerRefresh } = useDataRefresh();

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Reply className="h-4 w-4" />
    </Button>
  );

  const handleSubmitReply = async () => {
    // Strip HTML tags for validation, but send full HTML content
    const textContent = replyText.replace(/<[^>]*>/g, "").trim();
    if (!textContent) return;

    startTransition(async () => {
      try {
        await replyToMessage(message.id, replyText);
        toast.success("Reply sent successfully");
        setReplyText("");
        setIsOpen(false);
        // Trigger data refresh instead of page reload
        triggerRefresh();
      } catch (error) {
        console.error("Error sending reply:", error);
        toast.error("Failed to send reply");
      }
    });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setReplyText("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Reply className="h-5 w-5" />
            Reply to Message
          </DialogTitle>
          <DialogDescription>
            Send a reply to {message.name} ({message.email})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Original Message</span>
            </div>
            <div className="text-sm space-y-1">
              <div>
                <span className="font-medium">Subject:</span> {message.subject}
              </div>
              <div className="bg-background/50 rounded p-2 mt-2">
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {message.message}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium">Your Reply</label>
            </div>
            <RichTextEditor
              placeholder="Type your reply here..."
              value={replyText}
              onChange={setReplyText}
              className="min-h-[120px]"
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              This reply will be sent to {message.email}
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-3 mt-6">
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </DialogTrigger>
          <LoadingButton
            onClick={handleSubmitReply}
            loading={isPending}
            disabled={!replyText.trim()}
            className="flex-1"
          >
            <Reply className="h-4 w-4 mr-2" />
            Send Reply
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
