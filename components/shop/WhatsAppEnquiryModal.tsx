"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

export function WhatsAppEnquiryModal({
  productName,
  onSubmit,
  onClose,
}: {
  productName: string;
  onSubmit: (name: string, phone: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(name.trim(), phone.trim());
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-1 flex items-start justify-between">
          <h2 className="font-display text-lg text-navy-900">Enquire on WhatsApp</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="text-neutral-400 hover:text-neutral-600">
            <X size={18} />
          </button>
        </div>
        <p className="mb-4 text-sm text-neutral-500">
          Share your details for <span className="font-medium text-navy-800">{productName}</span> and we&apos;ll
          continue on WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            autoFocus
            className="rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
          />
          <input
            type="tel"
            required
            pattern="[0-9+ ]{7,15}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
          />
          <button
            type="submit"
            className="mt-1 rounded-md bg-success-500 py-2.5 text-sm font-semibold text-white hover:brightness-90"
          >
            Continue to WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
