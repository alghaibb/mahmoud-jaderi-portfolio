import { useMemo } from "react";
import { useFilter } from "@/contexts/FilterContext";

export interface FilterableMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: Date | string;
  [key: string]: unknown;
}

export function useMessageFilter<T extends FilterableMessage>(messages: T[]) {
  const { filters } = useFilter();

  const filteredMessages = useMemo(() => {
    let filtered = [...messages];

    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(message =>
        message.name.toLowerCase().includes(searchLower) ||
        message.email.toLowerCase().includes(searchLower) ||
        (message.subject && message.subject.toLowerCase().includes(searchLower)) ||
        message.message.toLowerCase().includes(searchLower) ||
        (message.phone && message.phone.toLowerCase().includes(searchLower))
      );
    }

    // Status filter
    if (filters.statusFilter && filters.statusFilter !== "all") {
      filtered = filtered.filter(message => message.status === filters.statusFilter);
    }

    // Date filter
    if (filters.dateFilter && filters.dateFilter !== "all") {
      const now = new Date();

      switch (filters.dateFilter) {
        case "today":
          filtered = filtered.filter(message => {
            const msgDate = new Date(message.createdAt);
            return msgDate.toDateString() === now.toDateString();
          });
          break;
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(message => {
            const msgDate = new Date(message.createdAt);
            return msgDate >= weekAgo;
          });
          break;
        case "month":
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(message => {
            const msgDate = new Date(message.createdAt);
            return msgDate >= monthAgo;
          });
          break;
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue: unknown = a[filters.sortBy as keyof T];
      let bValue: unknown = b[filters.sortBy as keyof T];

      // Handle date sorting
      if (filters.sortBy === "createdAt") {
        aValue = new Date(aValue as string | Date).getTime();
        bValue = new Date(bValue as string | Date).getTime();
      }

      // Handle string sorting
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (filters.sortOrder === "asc") {
        return (aValue as string | number) < (bValue as string | number) ? -1 : (aValue as string | number) > (bValue as string | number) ? 1 : 0;
      } else {
        return (aValue as string | number) > (bValue as string | number) ? -1 : (aValue as string | number) < (bValue as string | number) ? 1 : 0;
      }
    });

    return filtered;
  }, [messages, filters]);

  return {
    filteredMessages,
    totalCount: messages.length,
    filteredCount: filteredMessages.length,
    hasFilters: filters.searchTerm !== "" || filters.statusFilter !== "all" || filters.dateFilter !== "all",
  };
}
