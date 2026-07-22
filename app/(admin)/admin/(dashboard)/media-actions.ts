"use server";

import { requireAdmin, getAccessToken } from "@/lib/server/session";
import { uploadMedia } from "@/lib/api/media";
import { ApiError } from "@/lib/api/client";

type Result = { ok: true; urls: string[] } | { ok: false; error: string };

/** Shared by every admin form that needs to attach real images (products, homepage content, ...). */
export async function uploadMediaAction(formData: FormData): Promise<Result> {
  await requireAdmin();
  const accessToken = (await getAccessToken())!;
  const files = formData.getAll("file").filter((f): f is File => f instanceof File);
  if (files.length === 0) return { ok: false, error: "No files provided." };

  try {
    const urls = await uploadMedia(files, accessToken);
    return { ok: true, urls };
  } catch (err) {
    if (err instanceof ApiError) {
      const body = err.body;
      const detail =
        body && typeof body === "object" ? Object.values(body as Record<string, unknown>).flat().join(" ") : "";
      return { ok: false, error: detail || "Upload failed." };
    }
    return { ok: false, error: "Upload failed." };
  }
}
