"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { projectCategories } from "@/lib/constants";
import { Search } from "lucide-react";
import { motion } from "motion/react";

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredProjectsCount: number;
}

export default function ProjectFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  filteredProjectsCount,
}: ProjectFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-12 space-y-6"
    >
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search projects, technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {projectCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="transition-all duration-200"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center text-sm text-muted-foreground">
        {filteredProjectsCount} project{filteredProjectsCount !== 1 ? "s" : ""}{" "}
        found
      </div>
    </motion.div>
  );
}
