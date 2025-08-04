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
      className="mb-12 space-y-8"
    >
      <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-2xl p-6 sm:p-8 border border-border/50">
        {/* Search Bar */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">Find Projects</h2>
            <p className="text-sm text-muted-foreground">
              Search by name, technology, or category
            </p>
          </div>

          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base bg-background/50 border-border/50 focus:bg-background transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-center text-muted-foreground">
              Filter by Category
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {projectCategories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "hover:bg-muted/50 border-border/50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {filteredProjectsCount} project
              {filteredProjectsCount !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
