"use client";

import { Minus, Plus } from "lucide-react";

export function QtyStepper({
  qty,
  onChange,
  min = 1,
  max = 10,
}: {
  qty: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-lg border border-neutral-300">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, qty - 1))}
        disabled={qty <= min}
        className="flex h-9 w-9 items-center justify-center text-neutral-600 disabled:opacity-30"
      >
        <Minus size={15} />
      </button>
      <span className="w-8 text-center text-sm font-medium">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, qty + 1))}
        disabled={qty >= max}
        className="flex h-9 w-9 items-center justify-center text-neutral-600 disabled:opacity-30"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
