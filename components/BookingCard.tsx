"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

type BookingCardProps = {
  pricePerNight: number;
  maxGuests?: number;
};

export default function BookingCard({ pricePerNight, maxGuests = 8 }: BookingCardProps) {
  const [guests, setGuests] = useState(1);

  return (
    <aside className="rounded-2xl border p-6 shadow-lg md:sticky md:top-6">
      <p className="text-xl font-semibold">
        {pricePerNight} € <span className="text-sm font-normal text-gray-500">noche</span>
      </p>
      <div className="mt-4 flex items-center justify-between rounded-xl border p-3">
        <span className="text-sm">Huéspedes</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Quitar huésped"
            onClick={() => setGuests((current) => Math.max(current - 1, 1))}
            disabled={guests === 1}
            className="h-8 w-8 rounded-full border disabled:opacity-40"
          >
            −
          </button>
          <span aria-live="polite" className="w-4 text-center">
            {guests}
          </span>
          <button
            type="button"
            aria-label="Añadir huésped"
            onClick={() => setGuests((current) => Math.min(current + 1, maxGuests))}
            disabled={guests === maxGuests}
            className="h-8 w-8 rounded-full border disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>
      <Button className="mt-4 w-full">Reservar</Button>
    </aside>
  );
}
