"use server";

import { getAccessToken } from "@/lib/server/session";
import { createOrder, type CreateOrderInput } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/client";
import type { Order } from "@/types/order";

export async function submitOrder(input: CreateOrderInput): Promise<{ order: Order } | { error: string }> {
  try {
    const accessToken = await getAccessToken();
    const order = await createOrder(input, accessToken);
    return { order };
  } catch (err) {
    if (err instanceof ApiError) {
      const body = err.body;
      const detail =
        body && typeof body === "object" ? Object.values(body as Record<string, unknown>).flat().join(" ") : "";
      return { error: detail || "Could not place your order. Please check your details and try again." };
    }
    return { error: "Something went wrong placing your order." };
  }
}
