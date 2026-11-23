import type { Amenity } from "@/types";

type AmenitiesGridProps = {
  amenities: Amenity[];
};

export default function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  return (
    <section className="grid grid-cols-2 gap-4 border-b pb-6 sm:grid-cols-3">
      {amenities.map((amenity) => (
        <div key={amenity.id} className="flex items-center gap-3 text-sm">
          <span aria-hidden="true" className="text-xl">
            {amenity.icon}
          </span>
          {amenity.label}
        </div>
      ))}
    </section>
  );
}
