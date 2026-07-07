import type { CategoryName, Product } from "@/types/product";
import { CATEGORY_SLUGS } from "@/lib/categories";
import { assignImages } from "@/data/images";
import { getDiscountPercent } from "@/lib/format";

function highlights(
  fabric: string,
  work: string,
  type: string,
  occasion: string,
  care = "Dry Clean Only"
): string[] {
  return [
    `Fabric: ${fabric}`,
    `Work: ${work}`,
    `Type: ${type}`,
    `Occasion: ${occasion}`,
    `Care: ${care}`,
  ];
}

interface RawProduct {
  id: string;
  category: CategoryName;
  name: string;
  price: number;
  mrp: number;
  description: string;
  colors: string[];
  sizes: string[];
  fabric: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  stock: number;
  isBestSeller?: boolean;
  imageSeed: number;
  imageCount?: number;
}

const SUIT_SIZES = ["S", "M", "L", "XL", "XXL"];
const SAREE_SIZES = ["Free Size"];
const LEHENGA_SIZES = ["S", "M", "L", "XL"];
const DRESS_SIZES = ["S", "M", "L", "XL", "XXL"];

const RAW_PRODUCTS: RawProduct[] = [
  // ---------- SUITS ----------
  {
    id: "suit-01", category: "Suit", name: "Anarkali Suit - Royal Blue Georgette",
    price: 2499, mrp: 3799,
    description: "Flowing floor-length Anarkali in georgette with delicate thread embroidery on the yoke, paired with matching churidar and dupatta. Ideal for festive gatherings.",
    colors: ["Royal Blue", "Maroon", "Emerald"], sizes: SUIT_SIZES, fabric: "Georgette",
    rating: 4.7, reviewCount: 428,
    highlights: highlights("Georgette", "Thread Embroidery", "Anarkali, Semi-stitched", "Festive, Party"),
    stock: 46, isBestSeller: true, imageSeed: 0,
  },
  {
    id: "suit-02", category: "Suit", name: "Straight-Cut Cotton Suit - Pastel Pink",
    price: 1299, mrp: 1599,
    description: "Breathable pure cotton straight-cut suit with block-printed detailing, perfect for daily wear and office use in humid weather.",
    colors: ["Pastel Pink", "Sky Blue", "Mint"], sizes: SUIT_SIZES, fabric: "Cotton",
    rating: 4.3, reviewCount: 176,
    highlights: highlights("Pure Cotton", "Block Print", "Straight-Cut, Unstitched", "Daily, Office Wear", "Machine Wash"),
    stock: 62, imageSeed: 1,
  },
  {
    id: "suit-03", category: "Suit", name: "Palazzo Suit Set - Mustard Yellow",
    price: 1799, mrp: 2199,
    description: "Rayon kurti with contrast palazzo pants and a lightweight printed dupatta, a comfortable set for casual outings.",
    colors: ["Mustard", "Olive", "Rust"], sizes: SUIT_SIZES, fabric: "Rayon",
    rating: 4.1, reviewCount: 94,
    highlights: highlights("Rayon", "Digital Print", "Palazzo Set, Stitched", "Casual, Day Outings", "Machine Wash"),
    stock: 38, imageSeed: 2,
  },
  {
    id: "suit-04", category: "Suit", name: "Punjabi Patiala Suit - Emerald Green",
    price: 2199, mrp: 2699,
    description: "Traditional Patiala salwar suit with phulkari-inspired embroidery, cotton-silk blend fabric for a rich festive look.",
    colors: ["Emerald", "Navy", "Maroon"], sizes: SUIT_SIZES, fabric: "Cotton Silk Blend",
    rating: 4.6, reviewCount: 312,
    highlights: highlights("Cotton Silk Blend", "Phulkari Embroidery", "Patiala, Semi-stitched", "Festive, Family Function"),
    stock: 29, imageSeed: 3,
  },
  {
    id: "suit-05", category: "Suit", name: "Chikankari Embroidered Suit - Ivory White",
    price: 3499, mrp: 4599,
    description: "Hand-crafted Lucknowi chikankari work on soft cotton fabric, a timeless elegant choice for summer weddings.",
    colors: ["Ivory", "Peach", "Powder Blue"], sizes: SUIT_SIZES, fabric: "Cotton",
    rating: 4.8, reviewCount: 501,
    highlights: highlights("Soft Cotton", "Hand Chikankari", "Straight, Semi-stitched", "Summer Wedding, Festive"),
    stock: 21, isBestSeller: true, imageSeed: 4,
  },
  {
    id: "suit-06", category: "Suit", name: "Designer Party Wear Suit - Wine Maroon",
    price: 4299, mrp: 5999,
    description: "Heavy sequin and zari embroidered suit with net dupatta, designed for evening parties and receptions.",
    colors: ["Wine", "Black", "Bottle Green"], sizes: SUIT_SIZES, fabric: "Net",
    rating: 4.5, reviewCount: 187,
    highlights: highlights("Net with Silk Lining", "Sequin & Zari Work", "Designer, Semi-stitched", "Evening Party, Reception"),
    stock: 17, imageSeed: 5,
  },
  {
    id: "suit-07", category: "Suit", name: "Printed Rayon Suit - Floral Peach",
    price: 1099, mrp: 1349,
    description: "All-over floral printed rayon suit set, lightweight and easy to maintain for everyday comfort.",
    colors: ["Peach", "Lavender", "Mint"], sizes: SUIT_SIZES, fabric: "Rayon",
    rating: 4.0, reviewCount: 68,
    highlights: highlights("Rayon", "All-over Floral Print", "Straight, Stitched", "Daily, Casual", "Machine Wash"),
    stock: 55, imageSeed: 6,
  },
  {
    id: "suit-08", category: "Suit", name: "Silk Blend Suit - Copper Orange",
    price: 2999, mrp: 3699,
    description: "Rich silk-blend fabric with golden zari border, tailored for festive pooja and family functions.",
    colors: ["Copper", "Teal", "Maroon"], sizes: SUIT_SIZES, fabric: "Silk Blend",
    rating: 4.4, reviewCount: 143,
    highlights: highlights("Silk Blend", "Zari Border", "Straight, Semi-stitched", "Pooja, Festive"),
    stock: 8, imageSeed: 7,
  },

  // ---------- SAREES ----------
  {
    id: "saree-01", category: "Saree", name: "Banarasi Silk Saree - Red & Gold",
    price: 6999, mrp: 9999,
    description: "Authentic Banarasi silk saree with intricate gold zari weaving, a bridal staple passed down through generations.",
    colors: ["Red", "Maroon", "Wine"], sizes: SAREE_SIZES, fabric: "Silk",
    rating: 4.9, reviewCount: 612,
    highlights: highlights("Pure Banarasi Silk", "Gold Zari Weave", "Bridal Saree with Unstitched Blouse", "Wedding, Bridal"),
    stock: 14, isBestSeller: true, imageSeed: 0,
  },
  {
    id: "saree-02", category: "Saree", name: "Kanjivaram Silk Saree - Peacock Blue",
    price: 8499, mrp: 12499,
    description: "Pure Kanjivaram silk with temple border and contrast pallu, woven by South Indian master artisans.",
    colors: ["Peacock Blue", "Emerald", "Purple"], sizes: SAREE_SIZES, fabric: "Silk",
    rating: 4.8, reviewCount: 389,
    highlights: highlights("Pure Kanjivaram Silk", "Temple Border Weave", "Contrast Pallu Saree", "Wedding, Festive"),
    stock: 11, isBestSeller: true, imageSeed: 1,
  },
  {
    id: "saree-03", category: "Saree", name: "Chiffon Party Wear Saree - Black Sequin",
    price: 2799, mrp: 3499,
    description: "Lightweight chiffon saree with all-over sequin work, drapes beautifully for cocktail parties.",
    colors: ["Black", "Navy", "Wine"], sizes: SAREE_SIZES, fabric: "Chiffon",
    rating: 4.3, reviewCount: 201,
    highlights: highlights("Chiffon", "All-over Sequin Work", "Party Wear Saree with Blouse", "Cocktail, Evening Party"),
    stock: 33, imageSeed: 2,
  },
  {
    id: "saree-04", category: "Saree", name: "Cotton Handloom Saree - Beige Weave",
    price: 1899, mrp: 2299,
    description: "Handwoven pure cotton saree with a self-textured weave, breathable and perfect for daily office wear.",
    colors: ["Beige", "Ivory", "Grey"], sizes: SAREE_SIZES, fabric: "Cotton",
    rating: 4.2, reviewCount: 156,
    highlights: highlights("Pure Handloom Cotton", "Self-textured Weave", "Everyday Saree with Blouse Piece", "Daily, Office Wear", "Hand Wash"),
    stock: 48, imageSeed: 3,
  },
  {
    id: "saree-05", category: "Saree", name: "Georgette Printed Saree - Coral Pink",
    price: 1699, mrp: 1999,
    description: "Soft georgette saree with digital floral print, comes with an unstitched matching blouse piece.",
    colors: ["Coral", "Pink", "Peach"], sizes: SAREE_SIZES, fabric: "Georgette",
    rating: 4.1, reviewCount: 122,
    highlights: highlights("Georgette", "Digital Floral Print", "Saree with Unstitched Blouse", "Casual, Day Function", "Machine Wash"),
    stock: 41, imageSeed: 4,
  },
  {
    id: "saree-06", category: "Saree", name: "Bandhani Saree - Rani Pink",
    price: 2399, mrp: 2899,
    description: "Traditional Gujarati bandhani tie-dye saree in vibrant rani pink, festive and eye-catching.",
    colors: ["Rani Pink", "Orange", "Yellow"], sizes: SAREE_SIZES, fabric: "Cotton",
    rating: 4.5, reviewCount: 267,
    highlights: highlights("Cotton", "Traditional Bandhani Tie-dye", "Saree with Blouse Piece", "Festive, Navratri"),
    stock: 26, imageSeed: 0,
  },
  {
    id: "saree-07", category: "Saree", name: "Linen Saree - Sea Green",
    price: 2199, mrp: 2599,
    description: "Premium linen saree with a subtle sheen and thin golden border, elegant for summer events.",
    colors: ["Sea Green", "Teal", "Mint"], sizes: SAREE_SIZES, fabric: "Linen",
    rating: 4.4, reviewCount: 178,
    highlights: highlights("Premium Linen", "Thin Golden Border", "Saree with Blouse Piece", "Summer, Day Events"),
    stock: 35, imageSeed: 1,
  },
  {
    id: "saree-08", category: "Saree", name: "Organza Saree - Lavender Purple",
    price: 3199, mrp: 3999,
    description: "Sheer organza fabric with delicate resham embroidery, adds a graceful silhouette for evening events.",
    colors: ["Lavender", "Mauve", "Lilac"], sizes: SAREE_SIZES, fabric: "Organza",
    rating: 4.3, reviewCount: 134,
    highlights: highlights("Organza", "Resham Embroidery", "Saree with Blouse Piece", "Evening, Reception"),
    stock: 19, imageSeed: 2,
  },

  // ---------- LEHENGA ----------
  {
    id: "lehenga-01", category: "Lehenga", name: "Designer Bridal Lehenga - Crimson Red Zari Work",
    price: 12999, mrp: 25999,
    description: "Heavy zari and stone embroidered bridal lehenga with a matching blouse and net dupatta, made for the big day.",
    colors: ["Crimson", "Maroon", "Red"], sizes: LEHENGA_SIZES, fabric: "Velvet",
    rating: 4.8, reviewCount: 128,
    highlights: highlights("Velvet", "Heavy Embroidery", "Semi-stitched", "Wedding, Bridal"),
    stock: 9, isBestSeller: true, imageSeed: 0,
  },
  {
    id: "lehenga-02", category: "Lehenga", name: "Designer Net Lehenga - Rose Gold Sequins",
    price: 9499, mrp: 13999,
    description: "Net lehenga with all-over rose gold sequin embroidery, tailored for sangeet and reception nights.",
    colors: ["Rose Gold", "Pink", "Champagne"], sizes: LEHENGA_SIZES, fabric: "Net",
    rating: 4.6, reviewCount: 96,
    highlights: highlights("Net", "All-over Sequin Embroidery", "Semi-stitched Lehenga Set", "Sangeet, Reception"),
    stock: 15, imageSeed: 1,
  },
  {
    id: "lehenga-03", category: "Lehenga", name: "Silk Lehenga Set - Teal Blue with Dupatta",
    price: 7999, mrp: 10499,
    description: "Rich silk lehenga with contrast embroidered blouse and flowy dupatta, ideal for festive celebrations.",
    colors: ["Teal", "Navy", "Turquoise"], sizes: LEHENGA_SIZES, fabric: "Silk",
    rating: 4.5, reviewCount: 74,
    highlights: highlights("Silk", "Contrast Embroidered Blouse", "Semi-stitched Lehenga Set", "Festive, Family Function"),
    stock: 22, imageSeed: 2,
  },
  {
    id: "lehenga-04", category: "Lehenga", name: "Georgette Lehenga - Mint Green Floral",
    price: 5999, mrp: 7499,
    description: "Light georgette lehenga with floral thread work, comfortable enough for day-time functions.",
    colors: ["Mint", "Pistachio", "White"], sizes: LEHENGA_SIZES, fabric: "Georgette",
    rating: 4.2, reviewCount: 61,
    highlights: highlights("Georgette", "Floral Thread Work", "Semi-stitched Lehenga Set", "Day Function, Haldi"),
    stock: 31, imageSeed: 0,
  },
  {
    id: "lehenga-05", category: "Lehenga", name: "Velvet Lehenga - Royal Purple Embroidered",
    price: 10999, mrp: 18999,
    description: "Plush velvet fabric with gota-patti embroidery, a regal choice for winter weddings.",
    colors: ["Royal Purple", "Wine", "Black"], sizes: LEHENGA_SIZES, fabric: "Velvet",
    rating: 4.7, reviewCount: 88,
    highlights: highlights("Velvet", "Gota-Patti Embroidery", "Semi-stitched Lehenga Set", "Winter Wedding, Reception"),
    stock: 12, imageSeed: 1,
  },
  {
    id: "lehenga-06", category: "Lehenga", name: "Party Wear Lehenga - Champagne Gold",
    price: 6499, mrp: 7999,
    description: "Shimmering champagne gold lehenga with sequin border, perfect for cocktail and party nights.",
    colors: ["Champagne", "Gold", "Ivory"], sizes: LEHENGA_SIZES, fabric: "Net",
    rating: 4.3, reviewCount: 52,
    highlights: highlights("Net with Shimmer Lining", "Sequin Border", "Semi-stitched Lehenga Set", "Cocktail, Party"),
    stock: 27, imageSeed: 2,
  },
  {
    id: "lehenga-07", category: "Lehenga", name: "Half Saree Lehenga - Turquoise Blue",
    price: 4999, mrp: 5999,
    description: "South Indian style half-saree lehenga set with temple border pallu, worn for traditional functions.",
    colors: ["Turquoise", "Teal", "Blue"], sizes: LEHENGA_SIZES, fabric: "Silk",
    rating: 4.4, reviewCount: 67,
    highlights: highlights("Silk", "Temple Border Pallu", "Half-saree Set, Semi-stitched", "Traditional Function, Housewarming"),
    stock: 24, imageSeed: 0,
  },
  {
    id: "lehenga-08", category: "Lehenga", name: "Engagement Lehenga - Blush Pink Stonework",
    price: 10999, mrp: 15999,
    description: "Delicate stonework and pearl detailing on soft net fabric, designed for engagement ceremonies.",
    colors: ["Blush Pink", "Peach", "Ivory"], sizes: LEHENGA_SIZES, fabric: "Net",
    rating: 4.6, reviewCount: 79,
    highlights: highlights("Net", "Stonework & Pearl Detailing", "Semi-stitched Lehenga Set", "Engagement, Ring Ceremony"),
    stock: 16, imageSeed: 1,
  },

  // ---------- READY-MADE DRESS ----------
  {
    id: "dress-01", category: "Ready-made Dress", name: "A-Line Kurti Dress - Indo-Western Fusion",
    price: 1499, mrp: 1899,
    description: "Contemporary A-line dress blending Indian prints with a western silhouette, great for college and casual outings.",
    colors: ["Black", "Maroon", "Mustard"], sizes: DRESS_SIZES, fabric: "Cotton Blend",
    rating: 4.1, reviewCount: 143,
    highlights: highlights("Cotton Blend", "Indo-Western Print", "A-Line, Ready to Wear", "College, Casual", "Machine Wash"),
    stock: 58, imageSeed: 0,
  },
  {
    id: "dress-02", category: "Ready-made Dress", name: "Floral Maxi Dress - Casual Wear",
    price: 1699, mrp: 1999,
    description: "Full-length floral maxi dress in soft crepe fabric, breezy and comfortable for daily wear.",
    colors: ["Multicolor Floral", "Pink", "Blue"], sizes: DRESS_SIZES, fabric: "Crepe",
    rating: 4.3, reviewCount: 219,
    highlights: highlights("Crepe", "Floral Print", "Maxi, Ready to Wear", "Daily, Casual Outing", "Machine Wash"),
    stock: 44, imageSeed: 1,
  },
  {
    id: "dress-03", category: "Ready-made Dress", name: "Anarkali Gown - Festive Wear",
    price: 3999, mrp: 6999,
    description: "Floor-sweeping Anarkali gown with embroidered bodice, a statement piece for festive evenings.",
    colors: ["Maroon", "Navy", "Emerald"], sizes: DRESS_SIZES, fabric: "Georgette",
    rating: 4.6, reviewCount: 231,
    highlights: highlights("Georgette", "Embroidered Bodice", "Anarkali Gown, Ready to Wear", "Festive, Evening Party"),
    stock: 20, isBestSeller: true, imageSeed: 2,
  },
  {
    id: "dress-04", category: "Ready-made Dress", name: "One-Piece Kaftan Dress - Printed Cotton",
    price: 1299, mrp: 1599,
    description: "Relaxed-fit kaftan dress in printed cotton, breathable and effortless for summer days.",
    colors: ["Multicolor Print", "Turquoise", "Coral"], sizes: DRESS_SIZES, fabric: "Cotton",
    rating: 4.0, reviewCount: 87,
    highlights: highlights("Cotton", "All-over Print", "Kaftan, Ready to Wear", "Summer, Resort Wear", "Machine Wash"),
    stock: 39, imageSeed: 3,
  },
  {
    id: "dress-05", category: "Ready-made Dress", name: "Bodycon Party Dress - Sequin Finish",
    price: 2199, mrp: 2799,
    description: "Fitted bodycon dress with sequin detailing, made for birthday parties and night outs.",
    colors: ["Black", "Gold", "Silver"], sizes: DRESS_SIZES, fabric: "Polyester",
    rating: 4.2, reviewCount: 165,
    highlights: highlights("Polyester with Sequins", "Sequin Detailing", "Bodycon, Ready to Wear", "Party, Night Out", "Hand Wash"),
    stock: 6, imageSeed: 4,
  },
  {
    id: "dress-06", category: "Ready-made Dress", name: "Wrap Dress - Office Wear",
    price: 1599, mrp: 1899,
    description: "Classic wrap-style dress in solid crepe, tailored for a polished office-appropriate look.",
    colors: ["Navy", "Black", "Wine"], sizes: DRESS_SIZES, fabric: "Crepe",
    rating: 4.3, reviewCount: 198,
    highlights: highlights("Crepe", "Solid, Wrap Tie-up", "Wrap Dress, Ready to Wear", "Office, Formal", "Machine Wash"),
    stock: 51, imageSeed: 5,
  },
  {
    id: "dress-07", category: "Ready-made Dress", name: "Fit & Flare Dress - Pastel Chiffon",
    price: 1899, mrp: 2299,
    description: "Chiffon fit-and-flare dress with a flattering waistline, suited for brunches and day events.",
    colors: ["Pastel Pink", "Mint", "Lilac"], sizes: DRESS_SIZES, fabric: "Chiffon",
    rating: 4.4, reviewCount: 112,
    highlights: highlights("Chiffon", "Pleated Waistline", "Fit & Flare, Ready to Wear", "Brunch, Day Event", "Hand Wash"),
    stock: 34, imageSeed: 0,
  },
  {
    id: "dress-08", category: "Ready-made Dress", name: "Indo-Western Jumpsuit - Embroidered",
    price: 2599, mrp: 3299,
    description: "Trendy embroidered jumpsuit fusing Indian craftsmanship with western tailoring, for the modern woman.",
    colors: ["Black", "Maroon", "Teal"], sizes: DRESS_SIZES, fabric: "Georgette",
    rating: 4.5, reviewCount: 153,
    highlights: highlights("Georgette", "Hand Embroidery", "Jumpsuit, Ready to Wear", "Sangeet, Cocktail Party"),
    stock: 18, imageSeed: 1,
  },
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({
  id: p.id,
  category: p.category,
  categorySlug: CATEGORY_SLUGS[p.category],
  name: p.name,
  price: p.price,
  mrp: p.mrp,
  discountPercent: getDiscountPercent(p.price, p.mrp),
  description: p.description,
  images: assignImages(p.category, p.imageSeed, p.imageCount ?? 3),
  colors: p.colors,
  sizes: p.sizes,
  fabric: p.fabric,
  rating: p.rating,
  reviewCount: p.reviewCount,
  highlights: p.highlights,
  stock: p.stock,
  isBestSeller: p.isBestSeller,
}));

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === slug);
}

export function getLatestProducts(limit = 6): Product[] {
  return [...PRODUCTS].reverse().slice(0, limit);
}

export function getBestSellers(limit = 8): Product[] {
  const flagged = PRODUCTS.filter((p) => p.isBestSeller);
  const rest = PRODUCTS.filter((p) => !p.isBestSeller).sort(
    (a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount
  );
  return [...flagged, ...rest].slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, limit);
}
