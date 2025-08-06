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
import { Trash2, AlertTriangle, Users } from "lucide-react";
import { useSelection } from "@/contexts/SelectionContext";
import { deleteMessage } from "../actions";
import { toast } from "sonner";
import { useState } from "react";
import { useDataRefresh } from "@/contexts/DataRefreshContext";

interface BulkDeleteModalProps {
  trigger?: React.ReactNode;
}

export default function BulkDeleteModal({ trigger }: BulkDeleteModalProps) {
  const { selectedItems, deselectAll } = useSelection();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { triggerRefresh } = useDataRefresh();

  const defaultTrigger = (
    <Button
      variant="destructive"
      size="sm"
      disabled={selectedItems.length === 0}
      className="gap-2"
    >
      <Trash2 className="h-4 w-4" />
      Delete Selected ({selectedItems.length})
    </Button>
  );

  const handleDelete = async () => {
    if (selectedItems.length === 0) return;

    setIsDeleting(true);
    try {
      // Delete messages one by one
      for (const messageId of selectedItems) {
        await deleteMessage(messageId);
      }

      toast.success(
        `Deleted ${selectedItems.length} message${selectedItems.length !== 1 ? "s" : ""} successfully`
      );
      deselectAll();
      setIsOpen(false);
      // Trigger data refresh instead of page reload
      triggerRefresh();
    } catch (error) {
      console.error("Error deleting messages:", error);
      toast.error("Failed to delete messages");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            Delete Multiple Messages
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              {selectedItems.length} message
              {selectedItems.length !== 1 ? "s" : ""}
            </span>
            ? This action cannot be undone and will also delete any associated
            replies.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {selectedItems.length} message
                {selectedItems.length !== 1 ? "s" : ""} selected
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Including any replies associated with these messages
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
            loading={isDeleting}
            variant="destructive"
            className="flex-1"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete {selectedItems.length} Message
            {selectedItems.length !== 1 ? "s" : ""}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
