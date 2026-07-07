"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/cn";

export type ViewMode = "grid" | "list";

export function GridListToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <div className="flex overflow-hidden rounded-md border border-neutral-300">
      {(["grid", "list"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          aria-label={`${mode} view`}
          onClick={() => onChange(mode)}
          className={cn(
            "flex h-8 w-9 items-center justify-center",
            value === mode ? "bg-maroon-600 text-white" : "bg-white text-neutral-500 hover:bg-neutral-50"
          )}
        >
          {mode === "grid" ? <LayoutGrid size={15} /> : <List size={15} />}
        </button>
      ))}
    </div>
  );
}
