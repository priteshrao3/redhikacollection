"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown, ImagePlus, Loader2, Plus, Trash2 } from "lucide-react";
import { showToast } from "@/components/shop/Toast";
import { uploadMediaAction } from "@/app/(admin)/admin/(dashboard)/media-actions";

type FieldType = "text" | "number" | "select" | "url" | "image";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

type Row = Record<string, string | number> & { id: number };
type ActionResult = { ok: true } | { ok: false; error: string };

const FIELD_CLASS =
  "w-36 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-sm shadow-sm outline-none transition-colors focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/15";

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string | number;
  onChange: (v: string | number) => void;
}) {
  if (field.type === "select") {
    return (
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className={`${FIELD_CLASS} appearance-none pr-8`}>
          {field.options!.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
      </div>
    );
  }
  if (field.type === "image") {
    return <CompactImageUpload value={String(value)} onChange={onChange} />;
  }
  return (
    <input
      type={field.type === "number" ? "number" : "text"}
      value={value}
      onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
      placeholder={field.placeholder}
      className={FIELD_CLASS}
    />
  );
}

function CompactImageUpload({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadMediaAction(formData);
    setUploading(false);
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    onChange(result.urls[0]);
  }

  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        className="relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-neutral-300 bg-white text-neutral-400 transition-colors hover:border-maroon-400 hover:text-maroon-500"
      >
        {uploading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : value ? (
          <Image src={value} alt="" fill sizes="36px" className="object-cover" />
        ) : (
          <ImagePlus size={14} />
        )}
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
    </>
  );
}

export function RepeatableListManager({
  title,
  items,
  fields,
  onCreate,
  onUpdate,
  onDelete,
}: {
  title: string;
  items: Row[];
  fields: FieldDef[];
  onCreate: (input: Record<string, string | number>) => Promise<ActionResult>;
  onUpdate: (id: number, input: Record<string, string | number>) => Promise<ActionResult>;
  onDelete: (id: number) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const emptyDraft = (): Record<string, string | number> =>
    Object.fromEntries(fields.map((f) => [f.key, f.type === "number" ? 0 : (f.options?.[0]?.value ?? "")]));

  const [newDraft, setNewDraft] = useState<Record<string, string | number>>(emptyDraft());
  const [rows, setRows] = useState<Record<number, Record<string, string | number>>>(
    Object.fromEntries(items.map((item) => [item.id, { ...item }]))
  );

  // Resync local edit state whenever the server sends a fresh items list
  // (e.g. after router.refresh() following an add/delete) — otherwise a
  // newly-added row renders with blank inputs despite saving fine.
  // Adjusted during render (React's recommended pattern), not in an effect,
  // so there's no extra commit/flicker and no set-state-in-effect lint error.
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setRows(Object.fromEntries(items.map((item) => [item.id, { ...item }])));
  }

  const [adding, setAdding] = useState(false);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setError("");
    setAdding(true);
    const result = await onCreate({ ...newDraft, sort_order: items.length });
    setAdding(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setNewDraft(emptyDraft());
    router.refresh();
  }

  async function handleSave(id: number) {
    setSavingId(id);
    const result = await onUpdate(id, rows[id]);
    setSavingId(null);
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    showToast("Saved.");
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this item?")) return;
    setDeletingId(id);
    const result = await onDelete(id);
    setDeletingId(null);
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    showToast("Deleted.");
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-navy-900">{title}</h3>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">{items.length}</span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-end gap-2 rounded-lg border border-neutral-100 bg-neutral-50/60 p-3">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-neutral-400">{field.label}</label>
                <FieldInput
                  field={field}
                  value={rows[item.id]?.[field.key] ?? ""}
                  onChange={(v) => setRows((prev) => ({ ...prev, [item.id]: { ...prev[item.id], [field.key]: v } }))}
                />
              </div>
            ))}
            <button
              type="button"
              disabled={savingId === item.id}
              onClick={() => handleSave(item.id)}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-maroon-600 hover:bg-maroon-50 disabled:opacity-50"
            >
              Save
            </button>
            <button
              type="button"
              aria-label="Delete item"
              disabled={deletingId === item.id}
              onClick={() => handleDelete(item.id)}
              className="rounded-lg p-2 text-neutral-400 hover:bg-danger-50 hover:text-danger-500 disabled:opacity-40"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-neutral-400">Nothing here yet.</p>}
      </div>

      <form onSubmit={handleAdd} className="mt-4 flex flex-wrap items-end gap-2 border-t border-neutral-100 pt-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-neutral-400">{field.label}</label>
            <FieldInput
              field={field}
              value={newDraft[field.key]}
              onChange={(v) => setNewDraft((prev) => ({ ...prev, [field.key]: v }))}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={adding}
          className="flex items-center gap-1 rounded-lg bg-maroon-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-maroon-700 disabled:opacity-50"
        >
          <Plus size={14} /> Add
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-danger-500">{error}</p>}
    </div>
  );
}
