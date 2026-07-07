"use client";

import { useState } from "react";
import { MapPin, Truck } from "lucide-react";

export function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function check() {
    if (!/^\d{6}$/.test(pincode)) {
      setResult("Please enter a valid 6-digit pincode.");
      return;
    }
    const days = 4 + (Number(pincode) % 3);
    setResult(`Delivery available. Usually arrives in ${days}-${days + 2} days.`);
  }

  return (
    <div className="rounded-lg border border-neutral-200 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-navy-900">
        <MapPin size={16} /> Delivery Options
      </div>
      <div className="mt-2.5 flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter Pincode"
          className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-maroon-500"
        />
        <button
          type="button"
          onClick={check}
          className="rounded-md bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
        >
          Check
        </button>
      </div>
      {result && (
        <p className="mt-2 flex items-start gap-1.5 text-xs text-neutral-600">
          <Truck size={14} className="mt-0.5 shrink-0" /> {result}
        </p>
      )}
    </div>
  );
}
