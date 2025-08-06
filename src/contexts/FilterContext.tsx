"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface FilterState {
  searchTerm: string;
  statusFilter: string;
  dateFilter: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface FilterContextType {
  // State
  filters: FilterState;

  // Actions
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setDateFilter: (date: string) => void;
  setSortBy: (field: string) => void;
  setSortOrder: (order: "asc" | "desc") => void;
  resetFilters: () => void;

  // Utilities
  hasActiveFilters: boolean;
}

const defaultFilters: FilterState = {
  searchTerm: "",
  statusFilter: "all",
  dateFilter: "all",
  sortBy: "createdAt",
  sortOrder: "desc",
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
  initialFilters?: Partial<FilterState>;
}

export function FilterProvider({
  children,
  initialFilters = {},
}: FilterProviderProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...initialFilters,
  });

  const setSearchTerm = useCallback((term: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: term }));
  }, []);

  const setStatusFilter = useCallback((status: string) => {
    setFilters((prev) => ({ ...prev, statusFilter: status }));
  }, []);

  const setDateFilter = useCallback((date: string) => {
    setFilters((prev) => ({ ...prev, dateFilter: date }));
  }, []);

  const setSortBy = useCallback((field: string) => {
    setFilters((prev) => ({ ...prev, sortBy: field }));
  }, []);

  const setSortOrder = useCallback((order: "asc" | "desc") => {
    setFilters((prev) => ({ ...prev, sortOrder: order }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const hasActiveFilters =
    filters.searchTerm !== "" ||
    filters.statusFilter !== "all" ||
    filters.dateFilter !== "all";

  const value: FilterContextType = {
    filters,
    setSearchTerm,
    setStatusFilter,
    setDateFilter,
    setSortBy,
    setSortOrder,
    resetFilters,
    hasActiveFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
