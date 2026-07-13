"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { CategoryName, CategorySlug, Product } from "@/types/product";
import type { ProductInput } from "@/lib/api/catalog";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { createProductAction, updateProductAction } from "@/app/(admin)/admin/(dashboard)/products/actions";

function toCsv(items: string[]): string {
  return items.join(", ");
}

function fromCsv(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: { slug: CategorySlug; name: CategoryName }[];
}) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [id, setId] = useState(product?.id ?? "");
  const [categorySlug, setCategorySlug] = useState<CategorySlug | "">(
    product?.categorySlug ?? categories[0]?.slug ?? ""
  );
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [mrp, setMrp] = useState(String(product?.mrp ?? ""));
  const [description, setDescription] = useState(product?.description ?? "");
  const [fabric, setFabric] = useState(product?.fabric ?? "");
  const [colors, setColors] = useState(toCsv(product?.colors ?? []));
  const [sizes, setSizes] = useState(toCsv(product?.sizes ?? []));
  const [highlights, setHighlights] = useState(toCsv(product?.highlights ?? []));
  const [imageUrls, setImageUrls] = useState(toCsv(product?.images ?? []));
  const [stock, setStock] = useState(String(product?.stock ?? "0"));
  const [isBestSeller, setIsBestSeller] = useState(product?.isBestSeller ?? false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const input: ProductInput = {
      id,
      categorySlug,
      name,
      price: Number(price),
      mrp: Number(mrp),
      description,
      colors: fromCsv(colors),
      sizes: fromCsv(sizes),
      fabric,
      highlights: fromCsv(highlights),
      stock: Number(stock),
      isBestSeller,
      imageUrls: fromCsv(imageUrls),
    };

    const result = isEdit ? await updateProductAction(product!.id, input) : await createProductAction(input);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Product ID (slug)"
          type="text"
          required
          disabled={isEdit}
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="e.g. suit-09"
          className="disabled:bg-neutral-100"
        />
        <Select label="Category" required value={categorySlug} onChange={(e) => setCategorySlug(e.target.value as CategorySlug)}>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      <Input label="Name" type="text" required value={name} onChange={(e) => setName(e.target.value)} />

      <div className="grid grid-cols-3 gap-4">
        <Input label="Price (₹)" type="number" required min={0} step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Input label="MRP (₹)" type="number" required min={0} step="0.01" value={mrp} onChange={(e) => setMrp(e.target.value)} />
        <Input label="Stock" type="number" required min={0} value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>

      <Textarea label="Description" required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />

      <Input label="Fabric" type="text" required value={fabric} onChange={(e) => setFabric(e.target.value)} />

      <Input
        label="Colors (comma-separated)"
        type="text"
        value={colors}
        onChange={(e) => setColors(e.target.value)}
        placeholder="Maroon, Navy, Gold"
      />

      <Input
        label="Sizes (comma-separated)"
        type="text"
        value={sizes}
        onChange={(e) => setSizes(e.target.value)}
        placeholder="S, M, L, XL"
      />

      <Input
        label="Highlights (comma-separated)"
        type="text"
        value={highlights}
        onChange={(e) => setHighlights(e.target.value)}
        placeholder="Hand embroidered, Pure silk"
      />

      <Input
        label="Image URLs (comma-separated)"
        type="text"
        value={imageUrls}
        onChange={(e) => setImageUrls(e.target.value)}
        placeholder="https://..., https://..."
      />

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          checked={isBestSeller}
          onChange={(e) => setIsBestSeller(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 text-maroon-600 focus:ring-maroon-500/30"
        />
        Mark as Best Seller
      </label>

      {error && <p className="text-sm text-danger-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-shine relative overflow-hidden rounded-md bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-maroon-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : isEdit ? "SAVE CHANGES" : "CREATE PRODUCT"}
      </button>
    </form>
  );
}
