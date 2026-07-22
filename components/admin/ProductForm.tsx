"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { CategoryName, CategorySlug, Product } from "@/types/product";
import type { ProductInput } from "@/lib/api/catalog";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { TagInput } from "@/components/ui/TagInput";
import { ImageUploadManager } from "@/components/admin/ImageUploadManager";
import { createProductAction, updateProductAction } from "@/app/(admin)/admin/(dashboard)/products/actions";

function slugifyPreview(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "product"
  );
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

  const [categorySlug, setCategorySlug] = useState<CategorySlug | "">(
    product?.categorySlug ?? categories[0]?.slug ?? ""
  );
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [mrp, setMrp] = useState(String(product?.mrp ?? ""));
  const [description, setDescription] = useState(product?.description ?? "");
  const [fabric, setFabric] = useState(product?.fabric ?? "");
  const [colors, setColors] = useState<string[]>(product?.colors ?? []);
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? []);
  const [highlights, setHighlights] = useState<string[]>(product?.highlights ?? []);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [stock, setStock] = useState(String(product?.stock ?? "0"));
  const [isBestSeller, setIsBestSeller] = useState(product?.isBestSeller ?? false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (images.length === 0) {
      setError("Add at least one product image.");
      return;
    }

    setLoading(true);
    const input: ProductInput = {
      categorySlug,
      name,
      price: Number(price),
      mrp: Number(mrp),
      description,
      colors,
      sizes,
      fabric,
      highlights,
      stock: Number(stock),
      isBestSeller,
      imageUrls: images,
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
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-navy-900">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <Input label="Product Name" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
              <p className="mt-1 text-xs text-neutral-400">
                {isEdit ? (
                  <>
                    Product ID: <span className="font-mono text-neutral-500">{product!.id}</span>
                  </>
                ) : (
                  <>
                    URL slug: <span className="font-mono text-neutral-500">{slugifyPreview(name || "product")}</span>{" "}
                    (auto-generated)
                  </>
                )}
              </p>
            </div>
            <Textarea label="Description" required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input label="Fabric" type="text" required value={fabric} onChange={(e) => setFabric(e.target.value)} />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-navy-900">Pricing &amp; Inventory</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Price (₹)" type="number" required min={0} step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input label="MRP (₹)" type="number" required min={0} step="0.01" value={mrp} onChange={(e) => setMrp(e.target.value)} />
            <Input label="Stock" type="number" required min={0} value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-navy-900">Variants &amp; Highlights</h3>
          <div className="space-y-4">
            <TagInput label="Colors" values={colors} onChange={setColors} placeholder="Type a color, press Enter" />
            <TagInput label="Sizes" values={sizes} onChange={setSizes} placeholder="Type a size, press Enter" />
            <TagInput label="Highlights" values={highlights} onChange={setHighlights} placeholder="Type a highlight, press Enter" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <ImageUploadManager images={images} onChange={setImages} />
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-navy-900">Organize</h3>
          <div className="space-y-4">
            <Select label="Category" required value={categorySlug} onChange={(e) => setCategorySlug(e.target.value as CategorySlug)}>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </Select>
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={isBestSeller}
                onChange={(e) => setIsBestSeller(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-maroon-600 focus:ring-maroon-500/30"
              />
              Mark as Best Seller
            </label>
          </div>
        </div>

        {error && <p className="text-sm text-danger-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-shine relative w-full overflow-hidden rounded-md bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-maroon-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "SAVE CHANGES" : "CREATE PRODUCT"}
        </button>
      </div>
    </form>
  );
}
