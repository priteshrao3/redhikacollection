import { apiFetch } from "@/lib/api/client";

/**
 * The one shared upload endpoint for every image in the admin panel —
 * product images, hero/promo/brand-story images, occasion tiles, etc. all
 * go through this same call and get back a URL, which the caller then
 * stores wherever it needs to (a product's image list, a SiteSettings
 * field, ...). No resource-specific upload plumbing lives anywhere else.
 */
export async function uploadMedia(files: File[], accessToken: string): Promise<string[]> {
  const formData = new FormData();
  for (const file of files) formData.append("file", file);
  const uploaded = await apiFetch<{ url: string }[]>("/media/upload/", {
    method: "POST",
    authToken: accessToken,
    body: formData,
  });
  return uploaded.map((u) => u.url);
}
