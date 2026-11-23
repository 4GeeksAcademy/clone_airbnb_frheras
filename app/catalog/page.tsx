"use client";

import { useState } from "react";
import ResultsHeader, { type PriceSort } from "@/components/ResultsHeader";
import MapPlaceholder from "@/components/MapPlaceholder";
import PropertyGrid from "@/components/PropertyGrid";
import { ROOMS } from "@/data/mock";

export default function CatalogPage() {
  const [sortOrder, setSortOrder] = useState<PriceSort>("price_asc");

  const sortedRooms = [...ROOMS].sort((a, b) =>
    sortOrder === "price_asc" ? a.pricePerNight - b.pricePerNight : b.pricePerNight - a.pricePerNight,
  );

  return (
    <div className="relative h-dvh overflow-hidden md:flex">
      <MapPlaceholder className="absolute inset-x-0 top-0 h-[48dvh] md:static md:order-2 md:h-full md:w-1/2" />
      <section className="absolute inset-x-0 top-[44dvh] bottom-0 overflow-y-auto rounded-t-3xl bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.1)] md:static md:order-1 md:h-full md:w-1/2 md:rounded-none md:shadow-none">
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-gray-300 md:hidden" />
        <ResultsHeader count={sortedRooms.length} sortOrder={sortOrder} onSortChange={setSortOrder} />
        <PropertyGrid properties={sortedRooms} isLoading={false} />
      </section>
    </div>
  );
}
