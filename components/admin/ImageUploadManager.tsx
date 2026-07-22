"use client";

import { useRef, useState, type DragEvent } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { uploadMediaAction } from "@/app/(admin)/admin/(dashboard)/media-actions";

export function ImageUploadManager({
  images,
  onChange,
  label = "Images",
}: {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files);
    if (list.length === 0) return;
    setError("");
    setUploading(true);
    const formData = new FormData();
    for (const file of list) formData.append("file", file);
    const result = await uploadMediaAction(formData);
    setUploading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onChange([...images, ...result.urls]);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
  }

  function removeAt(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-neutral-500">{label}</label>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((url, i) => (
          <div key={url} className="group relative aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
            <Image src={url} alt="" fill sizes="150px" className="object-cover" />
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => removeAt(i)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X size={13} />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                Cover
              </span>
            )}
          </div>
        ))}

        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          className={cn(
            "flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed text-neutral-400 transition-colors hover:border-maroon-400 hover:text-maroon-500",
            dragOver ? "border-maroon-500 bg-maroon-50 text-maroon-600" : "border-neutral-300"
          )}
        >
          {uploading ? (
            <Loader2 size={22} className="animate-spin" />
          ) : (
            <>
              <ImagePlus size={22} />
              <span className="text-[11px] font-medium">Add Image</span>
            </>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files) uploadFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error && <p className="mt-2 text-xs text-danger-500">{error}</p>}
      <p className="mt-2 text-xs text-neutral-400">JPEG, PNG, WebP or GIF, up to 5MB each. First image is the cover photo.</p>
    </div>
  );
}
