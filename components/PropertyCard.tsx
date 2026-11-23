import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/types";

type PropertyCardProps = {
  property: Room;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/rooms/${property.id}`} className="flex flex-col gap-2">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
        {property.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold shadow">
            {property.badge}
          </span>
        )}
      </div>
      <h3 className="line-clamp-2 text-sm font-semibold">{property.title}</h3>
      <p className="text-xs text-gray-500">{property.subtitle}</p>
      <p className="text-xs">
        <span className="font-semibold">{property.pricePerNight} € </span>noche
        <span className="ml-2">★ {property.rating.toFixed(2)}</span>
      </p>
    </Link>
  );
}
