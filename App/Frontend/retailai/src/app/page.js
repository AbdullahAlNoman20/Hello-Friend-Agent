"use client";

import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { ProductGrid } from "../components/ProductGrid";
import { Footer } from "../components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/footwear?limit=12");

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Products data:", data);
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      setProducts([]); // Clear products on error;
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setIsSearching(results.length > 0);
  };

  // Display search results if searching, otherwise show regular products
  const displayProducts = isSearching ? searchResults : products;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-4">Error: {error}</p>
            <button
              onClick={fetchProducts}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />

        {/* Search Section */}
        <section className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearchResults={handleSearchResults} />
            {isSearching && (
              <div className="mt-4 text-center">
                <p className="text-muted-foreground">
                  Found {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""}
                  {searchResults.length === 0 && " - No products found"}
                </p>
                <button
                  onClick={() => {
                    setIsSearching(false);
                    setSearchResults([]);
                  }}
                  className="mt-2 text-primary hover:text-primary/80 underline"
                >
                  Show all products
                </button>
              </div>
            )}
          </div>
        </section>

        <ProductGrid products={displayProducts} />
      </main>
      <Footer />
    </div>
  );
}
