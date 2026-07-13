"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, getAccessToken } from "@/lib/server/session";
import { createProduct, deleteProduct, updateProduct, type ProductInput } from "@/lib/api/catalog";
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

export async function createProductAction(
  input: ProductInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const accessToken = (await getAccessToken())!;
  try {
    await createProduct(input, accessToken);
    revalidatePath("/admin/products");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: extractError(err) };
  }
}

export async function updateProductAction(
  id: string,
  input: ProductInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const accessToken = (await getAccessToken())!;
  try {
    await updateProduct(id, input, accessToken);
    revalidatePath("/admin/products");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: extractError(err) };
  }
}

export async function deleteProductAction(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const accessToken = (await getAccessToken())!;
  try {
    await deleteProduct(id, accessToken);
    revalidatePath("/admin/products");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: extractError(err) };
  }
}
