"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/api/analytics";

export function ProductViewTracker({ productId, category }: { productId: string; category: string }) {
  useEffect(() => {
    trackEvent("product_view", productId, category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  return null;
}
