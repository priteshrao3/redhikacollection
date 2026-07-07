export type CategoryName = "Suit" | "Saree" | "Lehenga" | "Ready-made Dress";
export type CategorySlug = "suits" | "sarees" | "lehengas" | "dresses";

export interface Product {
  id: string;
  category: CategoryName;
  categorySlug: CategorySlug;
  name: string;
  price: number;
  mrp: number;
  discountPercent: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  fabric: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  stock: number;
  isBestSeller?: boolean;
}
