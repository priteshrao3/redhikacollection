"use client";

import { Play, RotateCcw } from "lucide-react";

export function SimulateTrafficControls({
  onSimulate,
  onReset,
}: {
  onSimulate: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex gap-2.5">
      <button
        onClick={onSimulate}
        className="flex items-center gap-1.5 rounded-md bg-maroon-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-maroon-700"
      >
        <Play size={13} /> Simulate Traffic
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-1.5 rounded-md border border-neutral-300 px-3.5 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
      >
        <RotateCcw size={13} /> Reset Data
      </button>
    </div>
  );
}
