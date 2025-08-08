"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { searchFootwear } from "@/lib/search";
import { Input } from "@/components/ui/input";

export function SearchBar({
  onSearchResults,
  placeholder = "Search footwear...",
}) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setShowResults(false);
      onSearchResults?.([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchFootwear(searchQuery);
      onSearchResults?.(results);
      setShowResults(true);
    } catch (error) {
      console.error("Search failed:", error);
      onSearchResults?.([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleClear = () => {
    setQuery("");
    setShowResults(false);
    onSearchResults?.([]);
  };

  return (
    <div className="relative">
      <div className="relative max-w-[600px] w-full mx-auto">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10"
          size={20}
        />
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-border/50 hover:border-primary/50 focus:border-primary transition-all duration-300 shadow-lg hover:shadow-xl"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground z-10 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-4 z-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted-foreground">Searching...</span>
          </div>
        </div>
      )}
    </div>
  );
}
