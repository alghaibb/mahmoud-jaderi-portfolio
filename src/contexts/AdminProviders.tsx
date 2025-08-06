"use client";

import { ReactNode } from "react";
import { FilterProvider } from "./FilterContext";
import { SelectionProvider } from "./SelectionContext";
import { DataRefreshProvider } from "./DataRefreshContext";

interface AdminProvidersProps {
  children: ReactNode;
}

export function AdminProviders({ children }: AdminProvidersProps) {
  return (
    <DataRefreshProvider>
      <FilterProvider
        initialFilters={{
          sortBy: "createdAt",
          sortOrder: "desc",
          statusFilter: "all",
          dateFilter: "all",
        }}
      >
        <SelectionProvider>{children}</SelectionProvider>
      </FilterProvider>
    </DataRefreshProvider>
  );
}
