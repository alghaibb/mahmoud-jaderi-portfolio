"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface SelectionContextType<T = string> {
  // State
  selectedItems: T[];
  isAllSelected: boolean;
  hasSelection: boolean;

  // Actions
  selectItem: (item: T) => void;
  deselectItem: (item: T) => void;
  toggleItem: (item: T) => void;
  selectAll: (items: T[]) => void;
  deselectAll: () => void;
  toggleAll: (items: T[]) => void;

  // Utilities
  isSelected: (item: T) => boolean;
  getSelectedCount: () => number;
}

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
);

interface SelectionProviderProps {
  children: ReactNode;
}

export function SelectionProvider({ children }: SelectionProviderProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const selectItem = useCallback((item: string) => {
    setSelectedItems((prev) => (prev.includes(item) ? prev : [...prev, item]));
  }, []);

  const deselectItem = useCallback((item: string) => {
    setSelectedItems((prev) => prev.filter((id) => id !== item));
  }, []);

  const toggleItem = useCallback((item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((id) => id !== item) : [...prev, item]
    );
  }, []);

  const selectAll = useCallback((items: string[]) => {
    setSelectedItems(items);
  }, []);

  const deselectAll = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const toggleAll = useCallback(
    (items: string[]) => {
      if (selectedItems.length === items.length) {
        deselectAll();
      } else {
        selectAll(items);
      }
    },
    [selectedItems.length, selectAll, deselectAll]
  );

  const isSelected = useCallback(
    (item: string) => {
      return selectedItems.includes(item);
    },
    [selectedItems]
  );

  const getSelectedCount = useCallback(() => {
    return selectedItems.length;
  }, [selectedItems.length]);

  const isAllSelected = selectedItems.length > 0;
  const hasSelection = selectedItems.length > 0;

  const value: SelectionContextType = {
    selectedItems,
    isAllSelected,
    hasSelection,
    selectItem,
    deselectItem,
    toggleItem,
    selectAll,
    deselectAll,
    toggleAll,
    isSelected,
    getSelectedCount,
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
}
