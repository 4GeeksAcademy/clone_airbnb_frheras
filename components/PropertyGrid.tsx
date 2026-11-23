import type { Room } from "@/types";
import PropertyCard from "@/components/PropertyCard";

type PropertyGridProps = {
  properties: Room[];
  isLoading: boolean;
};

const SKELETON_COUNT = 8;

export default function PropertyGrid({ properties, isLoading }: PropertyGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 px-4 pb-8 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <div key={index} className="flex flex-col gap-2" aria-hidden="true">
            <div className="aspect-square animate-pulse rounded-2xl bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return <p className="px-4 py-12 text-center text-gray-500">No hay alojamientos que coincidan con la búsqueda.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-4 pb-8 sm:grid-cols-3 lg:grid-cols-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
