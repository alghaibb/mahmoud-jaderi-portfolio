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
import { useAdmin } from "./AdminContext";
import BulkDeleteModal from "./BulkDeleteModal";

export function AdminControls() {
  const { state, dispatch, actions } = useAdmin();
  const {
    searchTerm,
    statusFilter,
    selectedMessages,
    showBulkActions,
    isPending,
    filteredMessages,
  } = state;

  const handleSearchChange = (value: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: value });
  };

  const handleStatusFilterChange = (value: string) => {
    dispatch({ type: "SET_STATUS_FILTER", payload: value });
  };

  const toggleBulkActions = () => {
    dispatch({ type: "SET_SHOW_BULK_ACTIONS", payload: !showBulkActions });
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
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
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
                onClick={() => actions.loadMessages()}
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
                onClick={() => actions.handleExportMessages("csv")}
                className="w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => actions.handleExportMessages("json")}
                className="w-full sm:w-auto"
              >
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>

              <Button
                variant={showBulkActions ? "default" : "outline"}
                size="sm"
                onClick={toggleBulkActions}
                className="w-full sm:w-auto"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Bulk Actions
              </Button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {filteredMessages.length} message
                {filteredMessages.length !== 1 ? "s" : ""} found
              </Badge>
              {selectedMessages.length > 0 && (
                <Badge variant="default">
                  {selectedMessages.length} selected
                </Badge>
              )}
            </div>

            {selectedMessages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={actions.selectAllMessages}
              >
                {selectedMessages.length === filteredMessages.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {showBulkActions && selectedMessages.length > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Badge variant="default">
                  {selectedMessages.length} message
                  {selectedMessages.length !== 1 ? "s" : ""} selected
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Choose an action to apply to selected messages:
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => actions.handleBulkStatusUpdate("READ")}
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Mark as Read
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => actions.handleBulkStatusUpdate("REPLIED")}
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Replied
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => actions.handleBulkStatusUpdate("ARCHIVED")}
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>

                <div className="w-full sm:w-auto">
                  <BulkDeleteModal
                    selectedCount={selectedMessages.length}
                    trigger={
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={selectedMessages.length === 0}
                        className="w-full gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Selected ({selectedMessages.length})
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
