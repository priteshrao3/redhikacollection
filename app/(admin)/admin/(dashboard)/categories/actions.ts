"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, getAccessToken } from "@/lib/server/session";
import { createCategory, deleteCategory, updateCategory } from "@/lib/api/catalog";
import { ApiError } from "@/lib/api/client";

function extractError(err: unknown): string {
  if (err instanceof ApiError) {
    const body = err.body;
    if (body && typeof body === "object") {
      return Object.values(body as Record<string, unknown>).flat().join(" ") || "Request failed.";
    }
  }
  return "Something went wrong. Please try again.";
}

export async function createCategoryAction(
  slug: string,
  name: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const accessToken = (await getAccessToken())!;
  try {
    await createCategory(slug, name, accessToken);
    revalidatePath("/admin/categories");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: extractError(err) };
  }
}

export async function updateCategoryAction(
  slug: string,
  name: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const accessToken = (await getAccessToken())!;
  try {
    await updateCategory(slug, name, accessToken);
    revalidatePath("/admin/categories");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: extractError(err) };
  }
}

export async function deleteCategoryAction(slug: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const accessToken = (await getAccessToken())!;
  try {
    await deleteCategory(slug, accessToken);
    revalidatePath("/admin/categories");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: extractError(err) };
  }
}
