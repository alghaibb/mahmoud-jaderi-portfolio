"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { ContactMessage, ContactReply } from "@/generated/prisma";
import { toast } from "sonner";
import {
  getContactMessages,
  getAdminAnalytics,
  replyToMessage,
  updateMessageStatus,
  bulkUpdateMessageStatus,
  deleteMessage,
  exportMessages,
} from "../actions";

type ContactMessageWithReplies = ContactMessage & {
  replies: ContactReply[];
};

type AdminAnalytics = {
  totalMessages: number;
  unreadMessages: number;
  repliedMessages: number;
  readMessages: number;
  recentMessages: number;
  avgResponseTimeHours: number;
  responseRate: number;
};

type AdminState = {
  messages: ContactMessageWithReplies[];
  filteredMessages: ContactMessageWithReplies[];
  analytics: AdminAnalytics | null;
  loading: boolean;
  searchTerm: string;
  statusFilter: string;
  selectedMessage: ContactMessageWithReplies | null;
  selectedMessages: string[];
  showBulkActions: boolean;
  isPending: boolean;
};

type AdminAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_MESSAGES"; payload: ContactMessageWithReplies[] }
  | { type: "SET_ANALYTICS"; payload: AdminAnalytics }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_STATUS_FILTER"; payload: string }
  | { type: "SET_SELECTED_MESSAGE"; payload: ContactMessageWithReplies | null }
  | { type: "SET_SELECTED_MESSAGES"; payload: string[] }
  | { type: "SET_SHOW_BULK_ACTIONS"; payload: boolean }
  | { type: "SET_IS_PENDING"; payload: boolean }
  | { type: "FILTER_MESSAGES" };

const initialState: AdminState = {
  messages: [],
  filteredMessages: [],
  analytics: null,
  loading: true,
  searchTerm: "",
  statusFilter: "all",
  selectedMessage: null,
  selectedMessages: [],
  showBulkActions: false,
  isPending: false,
};

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "SET_ANALYTICS":
      return { ...state, analytics: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload };
    case "SET_SELECTED_MESSAGE":
      return { ...state, selectedMessage: action.payload };
    case "SET_SELECTED_MESSAGES":
      return { ...state, selectedMessages: action.payload };
    case "SET_SHOW_BULK_ACTIONS":
      return { ...state, showBulkActions: action.payload };
    case "SET_IS_PENDING":
      return { ...state, isPending: action.payload };
    case "FILTER_MESSAGES":
      let filtered = state.messages;

      if (state.searchTerm) {
        filtered = filtered.filter(
          (message) =>
            message.name
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase()) ||
            message.email
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase()) ||
            message.subject
              ?.toLowerCase()
              .includes(state.searchTerm.toLowerCase()) ||
            message.message
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase())
        );
      }

      if (state.statusFilter !== "all") {
        filtered = filtered.filter(
          (message) => message.status === state.statusFilter
        );
      }

      return { ...state, filteredMessages: filtered };
    default:
      return state;
  }
}

type AdminContextType = {
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
  actions: {
    loadMessages: () => Promise<void>;
    loadAnalytics: () => Promise<void>;
    handleReply: (messageId: string, replyText: string) => Promise<boolean>;
    handleStatusUpdate: (messageId: string, status: string) => Promise<void>;
    handleBulkStatusUpdate: (status: string) => Promise<void>;
    handleDeleteMessage: (messageId: string) => Promise<void>;
    handleBulkDelete: () => Promise<void>;
    handleExportMessages: (format: "csv" | "json") => Promise<void>;
    toggleMessageSelection: (messageId: string) => void;
    selectAllMessages: () => void;
  };
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    // Only load data on client-side after component mounts
    if (typeof window !== "undefined") {
      loadMessages();
      loadAnalytics();
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "FILTER_MESSAGES" });
  }, [state.messages, state.searchTerm, state.statusFilter]);

  const loadMessages = async () => {
    try {
      const data = await getContactMessages();
      dispatch({ type: "SET_MESSAGES", payload: data });
    } catch (error) {
      console.error("Error loading messages:", error);

      // Check if it's an authentication error
      if (error instanceof Error && error.message.includes("redirect")) {
        // Handle redirect error - let it propagate
        return;
      }

      toast.error("Failed to load messages");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const loadAnalytics = async () => {
    try {
      const data = await getAdminAnalytics();
      dispatch({ type: "SET_ANALYTICS", payload: data });
    } catch (error) {
      console.error("Error loading analytics:", error);

      // Check if it's an authentication error
      if (error instanceof Error && error.message.includes("redirect")) {
        // Handle redirect error - let it propagate
        return;
      }

      toast.error("Failed to load analytics");
    }
  };

  const handleReply = async (
    messageId: string,
    replyText: string
  ): Promise<boolean> => {
    dispatch({ type: "SET_IS_PENDING", payload: true });
    try {
      await replyToMessage(messageId, replyText);
      await loadMessages();
      await loadAnalytics();
      toast.success("Reply sent successfully");
      return true;
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply");
      return false;
    } finally {
      dispatch({ type: "SET_IS_PENDING", payload: false });
    }
  };

  const handleStatusUpdate = async (messageId: string, status: string) => {
    dispatch({ type: "SET_IS_PENDING", payload: true });
    try {
      await updateMessageStatus(messageId, status);
      await loadMessages();
      await loadAnalytics();
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      dispatch({ type: "SET_IS_PENDING", payload: false });
    }
  };

  const handleBulkStatusUpdate = async (status: string) => {
    if (state.selectedMessages.length === 0) {
      toast.error("No messages selected");
      return;
    }

    dispatch({ type: "SET_IS_PENDING", payload: true });
    try {
      await bulkUpdateMessageStatus(state.selectedMessages, status);
      await loadMessages();
      await loadAnalytics();
      dispatch({ type: "SET_SELECTED_MESSAGES", payload: [] });
      dispatch({ type: "SET_SHOW_BULK_ACTIONS", payload: false });
      toast.success(`Updated ${state.selectedMessages.length} messages`);
    } catch (error) {
      console.error("Error bulk updating messages:", error);
      toast.error("Failed to update messages");
    } finally {
      dispatch({ type: "SET_IS_PENDING", payload: false });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    dispatch({ type: "SET_IS_PENDING", payload: true });
    try {
      await deleteMessage(messageId);
      await loadMessages();
      await loadAnalytics();
      toast.success("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    } finally {
      dispatch({ type: "SET_IS_PENDING", payload: false });
    }
  };

  const handleBulkDelete = async () => {
    const selectedIds = state.selectedMessages;
    if (selectedIds.length === 0) return;

    dispatch({ type: "SET_IS_PENDING", payload: true });
    try {
      // Delete messages one by one (we can optimize this later with a bulk server action)
      for (const messageId of selectedIds) {
        await deleteMessage(messageId);
      }

      // Clear selections and reload data
      dispatch({ type: "SET_SELECTED_MESSAGES", payload: [] });
      await loadMessages();
      await loadAnalytics();

      toast.success(
        `${selectedIds.length} message${selectedIds.length !== 1 ? "s" : ""} deleted successfully`
      );
    } catch (error) {
      console.error("Error deleting messages:", error);
      toast.error("Failed to delete messages");
    } finally {
      dispatch({ type: "SET_IS_PENDING", payload: false });
    }
  };

  const handleExportMessages = async (format: "csv" | "json") => {
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

  const toggleMessageSelection = (messageId: string) => {
    const newSelection = state.selectedMessages.includes(messageId)
      ? state.selectedMessages.filter((id) => id !== messageId)
      : [...state.selectedMessages, messageId];

    dispatch({ type: "SET_SELECTED_MESSAGES", payload: newSelection });
  };

  const selectAllMessages = () => {
    if (state.selectedMessages.length === state.filteredMessages.length) {
      dispatch({ type: "SET_SELECTED_MESSAGES", payload: [] });
    } else {
      dispatch({
        type: "SET_SELECTED_MESSAGES",
        payload: state.filteredMessages.map((m) => m.id),
      });
    }
  };

  const actions = {
    loadMessages,
    loadAnalytics,
    handleReply,
    handleStatusUpdate,
    handleBulkStatusUpdate,
    handleDeleteMessage,
    handleBulkDelete,
    handleExportMessages,
    toggleMessageSelection,
    selectAllMessages,
  };

  return (
    <AdminContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

export type { ContactMessageWithReplies, AdminAnalytics };
