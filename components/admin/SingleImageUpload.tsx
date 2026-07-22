"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { uploadMediaAction } from "@/app/(admin)/admin/(dashboard)/media-actions";

export function SingleImageUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadMediaAction(formData);
    setUploading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onChange(result.urls[0]);
  }

  return (
    <div className="sm:col-span-2">
      <label className="mb-1.5 block text-xs font-medium text-neutral-500">{label}</label>
      <div className="flex items-center gap-4">
        <div
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          className={cn(
            "relative flex h-20 w-32 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-neutral-300 bg-neutral-50 text-neutral-400 transition-colors hover:border-maroon-400 hover:text-maroon-500"
          )}
        >
          {uploading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : value ? (
            <Image src={value} alt="" fill sizes="128px" className="object-cover" />
          ) : (
            <ImagePlus size={18} />
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-navy-800 hover:bg-neutral-50"
          >
            {value ? "Change Image" : "Upload Image"}
          </button>
          {error && <p className="mt-1 text-xs text-danger-500">{error}</p>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
