"use client";

import { guessColorHex } from "@/lib/color-swatch";
import { cn } from "@/lib/cn";

export function ColorSizeSelector({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: {
  colors: string[];
  sizes: string[];
  selectedColor: string;
  selectedSize: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-sm text-neutral-500">
          Color: <span className="font-medium text-navy-900">{selectedColor}</span>
        </span>
        <div className="mt-2 flex gap-2.5">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              title={color}
              onClick={() => onColorChange(color)}
              className={cn(
                "h-8 w-8 rounded-full border-2",
                selectedColor === color ? "border-maroon-600" : "border-transparent"
              )}
              style={{ backgroundColor: guessColorHex(color) }}
            />
          ))}
        </div>
      </div>

      {sizes.length > 1 && (
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">
              Size: <span className="font-medium text-navy-900">{selectedSize}</span>
            </span>
            <button type="button" className="text-xs text-maroon-600 underline underline-offset-2">
              Size Guide
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onSizeChange(size)}
                className={cn(
                  "flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm font-medium",
                  selectedSize === size
                    ? "border-maroon-600 bg-maroon-600 text-white"
                    : "border-neutral-300 text-navy-800 hover:border-maroon-400"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
