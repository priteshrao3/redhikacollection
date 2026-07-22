"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

export function TagInput({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  function commitDraft() {
    const value = draft.trim();
    if (value && !values.includes(value)) onChange([...values, value]);
    setDraft("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitDraft();
    } else if (e.key === "Backspace" && draft === "" && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-neutral-500">{label}</label>
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-2 shadow-sm focus-within:border-maroon-500 focus-within:ring-2 focus-within:ring-maroon-500/15">
        {values.map((value, i) => (
          <span
            key={value}
            className="flex items-center gap-1 rounded-full bg-maroon-50 px-2.5 py-1 text-xs font-medium text-maroon-700"
          >
            {value}
            <button
              type="button"
              aria-label={`Remove ${value}`}
              onClick={() => removeAt(i)}
              className="text-maroon-400 hover:text-maroon-700"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
          placeholder={values.length === 0 ? placeholder : ""}
          className="min-w-24 flex-1 border-0 bg-transparent py-0.5 text-sm outline-none placeholder:text-neutral-400"
        />
      </div>
    </div>
  );
}
