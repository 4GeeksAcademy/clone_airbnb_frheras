type MapPlaceholderProps = {
  className?: string;
};

export default function MapPlaceholder({ className = "" }: MapPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label="Mapa de ubicaciones (placeholder)"
      className={`flex items-center justify-center bg-gray-200 text-sm text-gray-500 ${className}`}
    >
      Mapa (placeholder)
    </div>
  );
}
