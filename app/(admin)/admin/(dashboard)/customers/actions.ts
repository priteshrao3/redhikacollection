"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, getAccessToken } from "@/lib/server/session";
import { adminToggleCustomerActive, type Customer } from "@/lib/api/customers";

export async function toggleCustomerActiveAction(
  id: number
): Promise<{ ok: true; customer: Customer } | { ok: false; error: string }> {
  await requireAdmin();
  const accessToken = (await getAccessToken())!;
  try {
    const customer = await adminToggleCustomerActive(id, accessToken);
    revalidatePath("/admin/customers");
    revalidatePath(`/admin/customers/${id}`);
    return { ok: true, customer };
  } catch {
    return { ok: false, error: "Could not update customer." };
  }
}
