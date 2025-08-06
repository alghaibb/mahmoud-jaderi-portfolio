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
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader className="pb-4 border-b border-border/50">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Reply className="h-5 w-5 text-primary" />
            </div>
            Reply to Message
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            Send a reply to <span className="font-medium">{message.name}</span> at{" "}
            <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
              {message.email}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-6 py-6 overflow-y-auto">
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-5 border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">Original Message</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Subject:</span>
                <span className="text-sm font-medium">{message.subject}</span>
              </div>
              <div className="bg-background/60 rounded-md p-4 border border-border/30">
                <p className="text-sm leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto">
                  {message.message}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <label className="text-base font-semibold">Your Reply</label>
            </div>
            
            <div className="bg-gradient-to-br from-background to-muted/20 rounded-lg p-4 border border-border/50">
              <RichTextEditor
                placeholder="Type your reply here... You can use markdown formatting for rich text."
                value={replyText}
                onChange={setReplyText}
                className="min-h-[300px] bg-background border-border/30"
                disabled={isPending}
              />
            </div>
            
            <div className="flex items-center gap-2 px-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-muted-foreground">
                This reply will be sent to{" "}
                <span className="font-medium text-foreground">{message.email}</span>
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3 pt-4 border-t border-border/50 mt-auto">
          <Button 
            variant="outline" 
            className="flex-1 h-11"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={handleSubmitReply}
            loading={isPending}
            disabled={!replyText.trim()}
            className="flex-1 h-11"
          >
            <Reply className="h-4 w-4 mr-2" />
            Send Reply
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
