"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, getAccessToken } from "@/lib/server/session";
import { adminToggleEnquiryContacted } from "@/lib/api/enquiries";

export async function toggleEnquiryContactedAction(id: number): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const accessToken = (await getAccessToken())!;
  try {
    await adminToggleEnquiryContacted(id, accessToken);
    revalidatePath("/admin/enquiries");
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not update enquiry." };
  }
}
