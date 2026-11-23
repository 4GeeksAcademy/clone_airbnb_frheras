"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import AmenitiesGrid from "@/components/AmenitiesGrid";
import BookingCard from "@/components/BookingCard";
import HostInfo from "@/components/HostInfo";
import ImageGallery from "@/components/ImageGallery";
import PropertyHeader from "@/components/PropertyHeader";
import { getRoomDetail } from "@/data/mock";
import type { RoomDetail } from "@/types";

const SIMULATED_DELAY_MS = 400;

type RoomPageProps = {
  params: Promise<{ id: string }>;
};

export default function RoomPage({ params }: RoomPageProps) {
  const { id } = use(params);
  const [loaded, setLoaded] = useState<{ id: string; room: RoomDetail | undefined } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded({ id, room: getRoomDetail(id) });
    }, SIMULATED_DELAY_MS);

    return () => clearTimeout(timer);
  }, [id]);

  const isLoading = loaded?.id !== id;
  const room = loaded?.id === id ? loaded.room : undefined;

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl animate-pulse space-y-6 px-4 py-6">
        <div className="aspect-video rounded-2xl bg-gray-200" />
        <div className="h-6 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-1/3 rounded bg-gray-200" />
      </main>
    );
  }

  if (!room) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold">Alojamiento no encontrado</h1>
        <Link href="/catalog" className="mt-4 inline-block text-rose-500 underline">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:grid md:grid-cols-3 md:gap-10">
      <div className="space-y-6 md:col-span-2">
        <Link href="/catalog" className="inline-block text-sm text-gray-600 underline">
          ← Volver al catálogo
        </Link>
        <ImageGallery images={room.images} alt={room.title} />
        <PropertyHeader
          title={room.title}
          propertyType={room.subtitle}
          location={room.location}
          rating={room.rating}
          reviewCount={room.reviewCount}
        />
        <HostInfo host={room.host} />
        <p className="border-b pb-6 text-sm leading-relaxed">{room.description}</p>
        <AmenitiesGrid amenities={room.amenities} />
      </div>
      <div className="mt-6 md:mt-0">
        <BookingCard pricePerNight={room.pricePerNight} />
      </div>
    </main>
  );
}
