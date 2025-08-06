import { useTransition } from "react";
import { useSelection } from "@/contexts/SelectionContext";
import { toast } from "sonner";

interface BulkActionsOptions {
  onSuccess?: () => Promise<void> | void;
  onError?: (error: Error) => void;
}

export function useBulkActions(options: BulkActionsOptions = {}) {
  const [isPending, startTransition] = useTransition();
  const { selectedItems, deselectAll, getSelectedCount } = useSelection();

  const executeBulkAction = async (
    action: (selectedIds: string[]) => Promise<void>,
    successMessage: string,
    confirmMessage?: string
  ) => {
    if (selectedItems.length === 0) {
      toast.error("No items selected");
      return;
    }

    if (confirmMessage && !confirm(confirmMessage)) {
      return;
    }

    startTransition(async () => {
      try {
        await action(selectedItems);
        deselectAll();

        if (options.onSuccess) {
          await options.onSuccess();
        }

        toast.success(`${successMessage} (${getSelectedCount()} items)`);
      } catch (error) {
        console.error("Bulk action failed:", error);

        if (options.onError) {
          options.onError(error as Error);
        } else {
          toast.error("Failed to complete bulk action");
        }
      }
    });
  };

  const bulkDelete = async (
    deleteAction: (selectedIds: string[]) => Promise<void>
  ) => {
    await executeBulkAction(
      deleteAction,
      "Items deleted successfully",
      "Are you sure you want to delete the selected items? This action cannot be undone."
    );
  };

  const bulkUpdate = async (
    updateAction: (selectedIds: string[]) => Promise<void>,
    successMessage: string = "Items updated successfully"
  ) => {
    await executeBulkAction(updateAction, successMessage);
  };

  return {
    isPending,
    selectedCount: getSelectedCount(),
    hasSelection: selectedItems.length > 0,
    bulkDelete,
    bulkUpdate,
    executeBulkAction,
  };
}
