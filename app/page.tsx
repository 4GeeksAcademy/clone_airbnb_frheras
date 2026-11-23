"use client";

import { useEffect, useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import Navbar from "@/components/Navbar";
import PropertyGrid from "@/components/PropertyGrid";
import { CATEGORIES, ROOMS } from "@/data/mock";
import type { Room } from "@/types";

const SIMULATED_DELAY_MS = 400;

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [results, setResults] = useState<Room[]>(ROOMS);
  const [isLoading, setIsLoading] = useState(true);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setIsLoading(true);
  };

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    setIsLoading(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const term = query.trim().toLowerCase();
      const filtered = ROOMS.filter((room) => {
        const matchesCategory = activeCategory === "all" || room.propertyType === activeCategory;
        const matchesQuery =
          term === "" ||
          room.title.toLowerCase().includes(term) ||
          room.location.toLowerCase().includes(term);
        return matchesCategory && matchesQuery;
      });
      setResults(filtered);
      setIsLoading(false);
    }, SIMULATED_DELAY_MS);

    return () => clearTimeout(timer);
  }, [query, activeCategory]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar query={query} onQueryChange={handleQueryChange} />
      <CategoryFilter categories={CATEGORIES} activeId={activeCategory} onSelect={handleCategorySelect} />
      <main className="mx-auto w-full max-w-6xl flex-1">
        <PropertyGrid properties={results} isLoading={isLoading} />
      </main>
    </div>
  );
}
