import type { ReactNode } from "react";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Room extends Coordinates {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  propertyType: string;
  pricePerNight: number;
  totalPrice?: number;
  dateRange?: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  imageUrl: string;
  images: string[];
}

export interface Host {
  name: string;
  yearsExperience?: number;
  avatarUrl: string;
}

export interface Highlight {
  id: string;
  icon: string;
  title: string;
  description?: string;
}

export interface Amenity {
  id: string;
  label: string;
  icon: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface RoomDetail extends Room {
  description: string;
  host: Host;
  highlights: Highlight[];
  amenities: Amenity[];
  reviews: Review[];
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  label: string;
  imageUrl: string;
}

export interface MapMarkerData extends Coordinates {
  id: string;
  priceLabel: string;
}

export interface FilterState {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
}

export type SortOption = "relevance" | "price_asc" | "price_desc" | "rating";

export interface SearchQuery {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
}
