import type { CategoryName } from "@/types/product";

// Curated real Unsplash photography, pooled by category. Each product pulls
// 2-3 images from its category's pool (deterministically, by index) rather
// than sourcing 32 unique matches -- several products share/overlap on
// source photos. All IDs below were verified live (HTTP 200) at build time.
const UNSPLASH_IDS: Record<CategoryName, string[]> = {
  Saree: [
    "photo-1742891601435-39de27531cc7",
    "photo-1769500804057-ca1391bf4617",
    "photo-1745482036066-5d215ed6b910",
    "photo-1768341395956-fed92f537228",
    "photo-1742038106824-ae078f37b633",
  ],
  Lehenga: [
    "photo-1762201698238-bf412e297016",
    "photo-1638456266087-09b1d160748b",
    "photo-1645862755924-9f4e7f200b83",
  ],
  Suit: [
    "photo-1552109870-dfa8590de1fb",
    "photo-1525373761544-a828e4bb1674",
    "photo-1741847639057-b51a25d42892",
  ],
  "Ready-made Dress": [
    "photo-1753192108753-81be0db2f7fe",
    "photo-1495385794356-15371f348c31",
    "photo-1502716119720-b23a93e5fe1b",
    "photo-1612722432474-b971cdcea546",
    "photo-1595777457583-95e059d581b8",
    "photo-1612336307429-8a898d10e223",
  ],
};

export const HERO_IMAGE_ID = "photo-1762201698238-bf412e297016";

function unsplashUrl(id: string, width = 1200): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export function assignImages(
  category: CategoryName,
  seed: number,
  count = 3
): string[] {
  const pool = UNSPLASH_IDS[category];
  const images: string[] = [];
  for (let i = 0; i < count; i++) {
    const id = pool[(seed + i) % pool.length];
    images.push(unsplashUrl(id));
  }
  return images;
}

export function heroImageUrl(width = 1600): string {
  return unsplashUrl(HERO_IMAGE_ID, width);
}
