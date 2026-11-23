type PropertyHeaderProps = {
  title: string;
  propertyType: string;
  location: string;
  rating: number;
  reviewCount: number;
};

export default function PropertyHeader({ title, propertyType, location, rating, reviewCount }: PropertyHeaderProps) {
  return (
    <header className="border-b pb-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-1 text-sm text-gray-500">
        {propertyType} · {location}
      </p>
      <p className="mt-2 text-sm font-medium">
        ★ {rating.toFixed(2)} · {reviewCount} reseñas
      </p>
    </header>
  );
}
