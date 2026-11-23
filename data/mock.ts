import type { Amenity, Category, Room, RoomDetail } from "@/types";

const image = (id: number) => `https://picsum.photos/id/${id}/600/600`;

export const AMENITIES: Amenity[] = [
  { id: "wifi", label: "Wifi rápido", icon: "📶" },
  { id: "kitchen", label: "Cocina equipada", icon: "🍳" },
  { id: "parking", label: "Parking gratuito", icon: "🅿️" },
  { id: "ac", label: "Aire acondicionado", icon: "❄️" },
  { id: "washer", label: "Lavadora", icon: "🧺" },
  { id: "tv", label: "Smart TV", icon: "📺" },
];

const HOST = {
  name: "Laura",
  yearsExperience: 6,
  avatarUrl: image(1027),
};

export function getRoomDetail(id: string): RoomDetail | undefined {
  const room = ROOMS.find((item) => item.id === id);
  if (!room) return undefined;

  return {
    ...room,
    description: `${room.title} en ${room.location}. Un alojamiento cómodo y bien comunicado, ideal para descansar tras un día de visita. Anfitriona disponible para resolver cualquier duda antes y durante la estancia.`,
    host: HOST,
    highlights: [],
    amenities: AMENITIES,
    reviews: [],
  };
}

export const CATEGORIES: Category[] = [
  { id: "all", label: "Todo", icon: "all" },
  { id: "apartment", label: "Apartamentos", icon: "apartment" },
  { id: "house", label: "Casas", icon: "house" },
  { id: "cabin", label: "Cabañas", icon: "cabin" },
  { id: "room", label: "Habitaciones", icon: "room" },
];

export const ROOMS: Room[] = [
  {
    id: "1",
    title: "Apartamento céntrico",
    subtitle: "Apartamento en Alicante",
    location: "Alicante, España",
    propertyType: "apartment",
    pricePerNight: 92,
    rating: 4.87,
    reviewCount: 74,
    badge: "Recomendado",
    imageUrl: image(1011),
    images: [image(1011), image(1012)],
    lat: 38.3452,
    lng: -0.481,
  },
  {
    id: "2",
    title: "Loft con vistas al mar",
    subtitle: "Apartamento en Valencia",
    location: "Valencia, España",
    propertyType: "apartment",
    pricePerNight: 118,
    rating: 4.93,
    reviewCount: 120,
    imageUrl: image(1015),
    images: [image(1015), image(1016)],
    lat: 39.4699,
    lng: -0.3763,
  },
  {
    id: "3",
    title: "Casa de playa familiar",
    subtitle: "Casa en Cádiz",
    location: "Cádiz, España",
    propertyType: "house",
    pricePerNight: 165,
    rating: 4.79,
    reviewCount: 58,
    imageUrl: image(1036),
    images: [image(1036), image(1037)],
    lat: 36.5271,
    lng: -6.2886,
  },
  {
    id: "4",
    title: "Casa rural con jardín",
    subtitle: "Casa en Segovia",
    location: "Segovia, España",
    propertyType: "house",
    pricePerNight: 140,
    rating: 4.85,
    reviewCount: 43,
    badge: "Superanfitrión",
    imageUrl: image(1040),
    images: [image(1040), image(1041)],
    lat: 40.9429,
    lng: -4.1088,
  },
  {
    id: "5",
    title: "Cabaña en el bosque",
    subtitle: "Cabaña en Asturias",
    location: "Asturias, España",
    propertyType: "cabin",
    pricePerNight: 110,
    rating: 4.91,
    reviewCount: 96,
    imageUrl: image(1043),
    images: [image(1043), image(1044)],
    lat: 43.3614,
    lng: -5.8593,
  },
  {
    id: "6",
    title: "Cabaña junto al río",
    subtitle: "Cabaña en Cuenca",
    location: "Cuenca, España",
    propertyType: "cabin",
    pricePerNight: 87,
    rating: 4.72,
    reviewCount: 31,
    imageUrl: image(1050),
    images: [image(1050), image(1051)],
    lat: 40.0704,
    lng: -2.1374,
  },
  {
    id: "7",
    title: "Habitación luminosa",
    subtitle: "Habitación en Madrid",
    location: "Madrid, España",
    propertyType: "room",
    pricePerNight: 45,
    rating: 4.66,
    reviewCount: 212,
    imageUrl: image(1060),
    images: [image(1060), image(1061)],
    lat: 40.4168,
    lng: -3.7038,
  },
  {
    id: "8",
    title: "Habitación con baño propio",
    subtitle: "Habitación en Granada",
    location: "Granada, España",
    propertyType: "room",
    pricePerNight: 52,
    rating: 4.81,
    reviewCount: 67,
    badge: "Recomendado",
    imageUrl: image(1062),
    images: [image(1062), image(1063)],
    lat: 37.1773,
    lng: -3.5986,
  },
];
