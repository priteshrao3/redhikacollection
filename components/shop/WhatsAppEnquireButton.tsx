"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/types/product";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/api/analytics";
import { createEnquiry } from "@/lib/api/enquiries";
import { getSavedContact, saveContact } from "@/lib/enquiry-contact";
import { cn } from "@/lib/cn";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { WhatsAppEnquiryModal } from "@/components/shop/WhatsAppEnquiryModal";

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
  const [showModal, setShowModal] = useState(false);
  const message = `Hi, I'm interested in "${product.name}". Could you please share the price and availability?`;
  const href = buildWhatsAppLink(settings.whatsappNumber, message);

  function proceed(name: string, phone: string) {
    trackEvent("whatsapp_enquiry", product.id, product.category);
    createEnquiry(product.id, name, phone).catch(() => {
      // Best-effort — a dropped lead capture should never block the shopper from reaching WhatsApp.
    });
    window.open(href, "_blank", "noopener,noreferrer");
  }

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const saved = getSavedContact();
    if (saved) {
      proceed(saved.name, saved.phone);
    } else {
      setShowModal(true);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-full bg-success-500 font-semibold text-white transition-colors hover:brightness-90",
          size === "lg" ? "w-full px-6 py-3 text-sm" : "px-3 py-1.5 text-xs",
          className
        )}
      >
        <MessageCircle size={size === "lg" ? 18 : 14} />
        Price ?
      </button>

      {showModal && (
        <WhatsAppEnquiryModal
          productName={product.name}
          onClose={() => setShowModal(false)}
          onSubmit={(name, phone) => {
            saveContact({ name, phone });
            setShowModal(false);
            proceed(name, phone);
          }}
        />
      )}
    </>
  );
}
