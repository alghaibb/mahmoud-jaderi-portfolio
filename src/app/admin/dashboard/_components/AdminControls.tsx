"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  Archive,
  Eye,
  Trash2,
} from "lucide-react";
import { useFilter } from "@/contexts/FilterContext";
import { useSelection } from "@/contexts/SelectionContext";
import { useBulkActions } from "@/hooks/useBulkActions";
import { bulkUpdateMessageStatus, exportMessages } from "../actions";
import { toast } from "sonner";
import { useDataRefresh } from "@/contexts/DataRefreshContext";
import BulkDeleteModal from "./BulkDeleteModal";

export function AdminControls() {
  const { filters, setSearchTerm, setStatusFilter } = useFilter();
  const { selectedItems, getSelectedCount, deselectAll } = useSelection();
  const { triggerRefresh } = useDataRefresh();
  const { bulkUpdate, isPending } = useBulkActions({
    onSuccess: async () => {
      triggerRefresh();
    },
  });

  const handleBulkStatusUpdate = async (status: string) => {
    await bulkUpdate(async (selectedIds) => {
      await bulkUpdateMessageStatus(selectedIds, status);
    }, `Updated ${getSelectedCount()} messages to ${status.toLowerCase()}`);
  };

  const handleExport = async (format: "csv" | "json") => {
    try {
      const result = await exportMessages(format);

      // Create download link
      const blob = new Blob([result.data], { type: result.contentType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = result.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`Messages exported as ${format.toUpperCase()}`);
    } catch (error) {
      console.error("Error exporting messages:", error);
      toast.error("Failed to export messages");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 items-start justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search messages..."
                  value={filters.searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={filters.statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
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

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => triggerRefresh()}
                disabled={isPending}
                className="w-full sm:w-auto"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isPending ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("csv")}
                className="w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport("json")}
                className="w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Messages</Badge>
              {selectedItems.length > 0 && (
                <Badge variant="default">{selectedItems.length} selected</Badge>
              )}
            </div>

            {selectedItems.length > 0 && (
              <Button variant="ghost" size="sm" onClick={deselectAll}>
                Clear Selection
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedItems.length > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Badge variant="default">
                  {selectedItems.length} message
                  {selectedItems.length !== 1 ? "s" : ""} selected
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Choose an action to apply to selected messages:
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkStatusUpdate("READ")}
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Mark as Read
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkStatusUpdate("REPLIED")}
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Replied
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkStatusUpdate("ARCHIVED")}
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>

                <div className="w-full sm:w-auto">
                  <BulkDeleteModal
                    trigger={
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={selectedItems.length === 0}
                        className="w-full gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Selected ({selectedItems.length})
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
