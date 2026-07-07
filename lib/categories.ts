import type { CategoryName, CategorySlug } from "@/types/product";

export const CATEGORIES: CategoryName[] = [
  "Suit",
  "Saree",
  "Lehenga",
  "Ready-made Dress",
];

export const CATEGORY_SLUGS: Record<CategoryName, CategorySlug> = {
  Suit: "suits",
  Saree: "sarees",
  Lehenga: "lehengas",
  "Ready-made Dress": "dresses",
};

export const SLUG_TO_CATEGORY: Record<CategorySlug, CategoryName> = {
  suits: "Suit",
  sarees: "Saree",
  lehengas: "Lehenga",
  dresses: "Ready-made Dress",
};

export const CATEGORY_LABEL_PLURAL: Record<CategoryName, string> = {
  Suit: "Suits",
  Saree: "Sarees",
  Lehenga: "Lehenga",
  "Ready-made Dress": "Ready-made Dresses",
};

export function slugToCategory(slug: string): CategoryName | undefined {
  return SLUG_TO_CATEGORY[slug as CategorySlug];
}

export function categoryToSlug(category: CategoryName): CategorySlug {
  return CATEGORY_SLUGS[category];
}
