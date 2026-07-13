"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, getAccessToken } from "@/lib/server/session";
import { adminDeleteReview } from "@/lib/api/catalog";

export async function deleteReviewAction(id: number): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const accessToken = (await getAccessToken())!;
  try {
    await adminDeleteReview(id, accessToken);
    revalidatePath("/admin/reviews");
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not delete review." };
  }
}
