import type { CategoryName, CategorySlug, Product } from "@/types/product";
import { apiFetch, type PaginatedResponse } from "@/lib/api/client";

export interface Review {
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

interface ApiCategory {
  slug: string;
  name: string;
}

interface ApiProduct {
  id: string;
  category_slug: string;
  category_name: string;
  name: string;
  price: number;
  mrp: number;
  discount_percent: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  fabric: string;
  rating: number;
  review_count: number;
  highlights: string[];
  stock: number;
  is_best_seller: boolean;
}

interface ApiReview {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

function mapProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    category: p.category_name as CategoryName,
    categorySlug: p.category_slug as CategorySlug,
    name: p.name,
    price: p.price,
    mrp: p.mrp,
    discountPercent: p.discount_percent,
    description: p.description,
    images: p.images,
    colors: p.colors,
    sizes: p.sizes,
    fabric: p.fabric,
    rating: p.rating,
    reviewCount: p.review_count,
    highlights: p.highlights,
    stock: p.stock,
    isBestSeller: p.is_best_seller,
  };
}

function mapReview(r: ApiReview): Review {
  return { author: r.author, rating: r.rating, date: r.date, title: r.title, body: r.body };
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export async function listCategories(): Promise<{ slug: CategorySlug; name: CategoryName }[]> {
  const categories = await apiFetch<ApiCategory[]>("/categories/");
  return categories.map((c) => ({ slug: c.slug as CategorySlug, name: c.name as CategoryName }));
}

async function listProducts(params: {
  category?: string;
  search?: string;
  ordering?: string;
  max_price?: number;
  fabric?: string;
  color?: string;
  page_size?: number;
}): Promise<Product[]> {
  const query = buildQuery(params);
  const page = await apiFetch<PaginatedResponse<ApiProduct>>(`/products/${query}`);
  return page.results.map(mapProduct);
}

export async function getProductCount(): Promise<number> {
  const page = await apiFetch<PaginatedResponse<ApiProduct>>("/products/?page_size=1");
  return page.count;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const product = await apiFetch<ApiProduct>(`/products/${id}/`);
    return mapProduct(product);
  } catch {
    return undefined;
  }
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  return listProducts({ category: slug });
}

/** Full catalog, for the admin product-management table. */
export async function getAllProducts(): Promise<Product[]> {
  return listProducts({ page_size: 100 });
}

export async function getLatestProducts(limit = 6): Promise<Product[]> {
  const products = await listProducts({ ordering: "-created_at" });
  return products.slice(0, limit);
}

export async function getBestSellers(limit = 8): Promise<Product[]> {
  const products = await listProducts({ ordering: "-is_best_seller,-popularity" });
  return products.slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const related = await apiFetch<ApiProduct[]>(`/products/${product.id}/related/?limit=${limit}`);
  return related.map(mapProduct);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim();
  if (!q) return [];
  return listProducts({ search: q });
}

export async function listReviews(productId: string): Promise<Review[]> {
  try {
    const reviews = await apiFetch<ApiReview[]>(`/products/${productId}/reviews/`);
    return reviews.map(mapReview);
  } catch {
    return [];
  }
}

export async function createReview(
  productId: string,
  payload: { author: string; rating: number; title: string; body: string }
): Promise<Review> {
  const review = await apiFetch<ApiReview>(`/products/${productId}/reviews/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return mapReview(review);
}

export interface ProductInput {
  categorySlug: string;
  name: string;
  price: number;
  mrp: number;
  description: string;
  colors: string[];
  sizes: string[];
  fabric: string;
  highlights: string[];
  stock: number;
  isBestSeller: boolean;
  /** Optional secondary path — pasted external URLs, alongside real uploads via uploadProductImages(). */
  imageUrls?: string[];
}

function toWirePayload(input: ProductInput) {
  return {
    category: input.categorySlug,
    name: input.name,
    price: input.price,
    mrp: input.mrp,
    description: input.description,
    colors: input.colors,
    sizes: input.sizes,
    fabric: input.fabric,
    highlights: input.highlights,
    stock: input.stock,
    is_best_seller: input.isBestSeller,
    ...(input.imageUrls ? { image_urls: input.imageUrls } : {}),
  };
}

/** Admin-only: throws ApiError on failure (validation, permission, etc). */
export async function createProduct(input: ProductInput, accessToken: string): Promise<Product> {
  const product = await apiFetch<ApiProduct>("/products/", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify(toWirePayload(input)),
  });
  return mapProduct(product);
}

export async function updateProduct(id: string, input: ProductInput, accessToken: string): Promise<Product> {
  const product = await apiFetch<ApiProduct>(`/products/${id}/`, {
    method: "PUT",
    authToken: accessToken,
    body: JSON.stringify(toWirePayload(input)),
  });
  return mapProduct(product);
}

export async function deleteProduct(id: string, accessToken: string): Promise<void> {
  await apiFetch<void>(`/products/${id}/`, { method: "DELETE", authToken: accessToken });
}

export async function createCategory(
  slug: string,
  name: string,
  accessToken: string
): Promise<{ slug: CategorySlug; name: CategoryName }> {
  const category = await apiFetch<ApiCategory>("/categories/", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify({ slug, name }),
  });
  return { slug: category.slug as CategorySlug, name: category.name as CategoryName };
}

export async function updateCategory(
  slug: string,
  name: string,
  accessToken: string
): Promise<{ slug: CategorySlug; name: CategoryName }> {
  const category = await apiFetch<ApiCategory>(`/categories/${slug}/`, {
    method: "PATCH",
    authToken: accessToken,
    body: JSON.stringify({ name }),
  });
  return { slug: category.slug as CategorySlug, name: category.name as CategoryName };
}

/** Throws ApiError(400) with a message if the category still has products (server-enforced). */
export async function deleteCategory(slug: string, accessToken: string): Promise<void> {
  await apiFetch<void>(`/categories/${slug}/`, { method: "DELETE", authToken: accessToken });
}

export interface AdminReview {
  id: number;
  productId: string;
  productName: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

interface ApiAdminReview {
  id: number;
  product_id: string;
  product_name: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

function mapAdminReview(r: ApiAdminReview): AdminReview {
  return {
    id: r.id,
    productId: r.product_id,
    productName: r.product_name,
    author: r.author,
    rating: r.rating,
    date: r.date,
    title: r.title,
    body: r.body,
  };
}

export async function adminListReviews(accessToken: string): Promise<AdminReview[]> {
  const page = await apiFetch<PaginatedResponse<ApiAdminReview>>("/reviews/?page_size=200", {
    authToken: accessToken,
  });
  return page.results.map(mapAdminReview);
}

export async function adminDeleteReview(id: number, accessToken: string): Promise<void> {
  await apiFetch<void>(`/reviews/${id}/`, { method: "DELETE", authToken: accessToken });
}
