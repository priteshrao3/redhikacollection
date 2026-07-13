"use client";

import { MessageCircle } from "lucide-react";
import type { Product } from "@/types/product";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/api/analytics";
import { cn } from "@/lib/cn";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export function WhatsAppEnquireButton({
  product,
  size = "sm",
  className,
}: {
  product: Product;
  size?: "sm" | "lg";
  className?: string;
}) {
  const settings = useSiteSettings();
  const message = `Hi, I'm interested in "${product.name}". Could you please share the price and availability?`;
  const href = buildWhatsAppLink(settings.whatsappNumber, message);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        trackEvent("whatsapp_enquiry", product.id, product.category);
        window.open(href, "_blank", "noopener,noreferrer");
      }}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full bg-success-500 font-semibold text-white transition-colors hover:brightness-90",
        size === "lg" ? "w-full px-6 py-3 text-sm" : "px-3 py-1.5 text-xs",
        className
      )}
    >
      <MessageCircle size={size === "lg" ? 18 : 14} />
      Price ?
    </button>
  );
}
