"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, getAccessToken } from "@/lib/server/session";
import { adminUpdateOrderStatus } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/client";
import type { OrderStatus } from "@/types/order";

export async function updateOrderStatusAction(
  orderNumber: string,
  status: OrderStatus
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  const accessToken = (await getAccessToken())!;
  try {
    await adminUpdateOrderStatus(orderNumber, status, accessToken);
    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { ok: true };
  } catch (err) {
    if (err instanceof ApiError) {
      return { ok: false, error: "Could not update order status." };
    }
    return { ok: false, error: "Something went wrong." };
  }
}
