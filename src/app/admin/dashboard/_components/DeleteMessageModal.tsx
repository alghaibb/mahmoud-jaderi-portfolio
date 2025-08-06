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
import { LoadingButton } from "@/components/ui/loading-button";
import { Trash2, AlertTriangle } from "lucide-react";
import { ContactMessage, ContactReply } from "@/generated/prisma";
import { deleteMessage } from "../actions";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useDataRefresh } from "@/contexts/DataRefreshContext";

type ContactMessageWithReplies = ContactMessage & {
  replies: ContactReply[];
};

interface DeleteMessageModalProps {
  message: ContactMessageWithReplies;
  trigger?: React.ReactNode;
}

export default function DeleteMessageModal({
  message,
  trigger,
}: DeleteMessageModalProps) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const { triggerRefresh } = useDataRefresh();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteMessage(message.id);
        toast.success("Message deleted successfully");
        setIsOpen(false);
        // Trigger data refresh instead of page reload
        triggerRefresh();
      } catch (error) {
        console.error("Error deleting message:", error);
        toast.error("Failed to delete message");
      }
    });
  };

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className="text-destructive hover:text-destructive hover:bg-destructive/10"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Are you sure you want to delete this message from{" "}
            <span className="font-medium text-foreground">{message.name}</span>?
            This action cannot be undone and will also delete any associated
            replies.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="space-y-1.5 text-sm">
              <div className="truncate">
                <span className="font-medium">From:</span> {message.name}
              </div>
              <div className="truncate">
                <span className="font-medium">Email:</span> {message.email}
              </div>
              <div className="truncate">
                <span className="font-medium">Subject:</span> {message.subject}
              </div>
              <div>
                <span className="font-medium">Date:</span>{" "}
                {new Date(message.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3 mt-6">
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </DialogTrigger>
          <LoadingButton
            onClick={handleDelete}
            loading={isPending}
            variant="destructive"
            className="flex-1"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Message
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
