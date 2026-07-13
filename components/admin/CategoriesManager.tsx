"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import type { CategoryName, CategorySlug } from "@/types/product";
import { showToast } from "@/components/shop/Toast";
import { Input } from "@/components/ui/Field";
import { Table, TBody, Td, THead, Th, Tr } from "@/components/ui/Table";
import { createCategoryAction, deleteCategoryAction, updateCategoryAction } from "@/app/(admin)/admin/(dashboard)/categories/actions";

export function CategoriesManager({ categories }: { categories: { slug: CategorySlug; name: CategoryName }[] }) {
  const router = useRouter();
  const [newSlug, setNewSlug] = useState("");
  const [newName, setNewName] = useState("");
  const [names, setNames] = useState<Record<string, string>>(
    Object.fromEntries(categories.map((c) => [c.slug, c.name]))
  );

  // Resync local edit state whenever the server sends a fresh category list
  // (e.g. after router.refresh() following an add/delete) — otherwise a
  // newly-added row renders with a blank name input despite saving fine.
  // Adjusted during render (React's recommended pattern), not in an effect,
  // so there's no extra commit/flicker and no set-state-in-effect lint error.
  const [prevCategories, setPrevCategories] = useState(categories);
  if (categories !== prevCategories) {
    setPrevCategories(categories);
    setNames(Object.fromEntries(categories.map((c) => [c.slug, c.name])));
  }
  const [adding, setAdding] = useState(false);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setAdding(true);
    const result = await createCategoryAction(newSlug.trim(), newName.trim());
    setAdding(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setNewSlug("");
    setNewName("");
    router.refresh();
  }

  async function handleSave(slug: string) {
    setSavingSlug(slug);
    const result = await updateCategoryAction(slug, names[slug]);
    setSavingSlug(null);
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    showToast("Category updated.");
    router.refresh();
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Delete category "${slug}"?`)) return;
    setDeletingSlug(slug);
    const result = await deleteCategoryAction(slug);
    setDeletingSlug(null);
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    showToast("Category deleted.");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
        <Input label="Slug" type="text" required value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="e.g. kurtis" className="w-40" />
        <Input label="Name" type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Kurti" className="w-48" />
        <button
          type="submit"
          disabled={adding}
          className="flex items-center gap-1.5 rounded-lg bg-maroon-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-maroon-700 disabled:opacity-50"
        >
          <Plus size={16} /> Add Category
        </button>
        {error && <p className="w-full text-sm text-danger-500">{error}</p>}
      </form>

      <Table>
        <THead>
          <Tr>
            <Th>Slug</Th>
            <Th>Name</Th>
            <Th>Action</Th>
          </Tr>
        </THead>
        <TBody>
          {categories.map((category) => (
            <Tr key={category.slug} className="transition-colors hover:bg-maroon-50/30">
              <Td className="font-mono text-xs text-neutral-500">{category.slug}</Td>
              <Td>
                <Input
                  type="text"
                  value={names[category.slug] ?? ""}
                  onChange={(e) => setNames((prev) => ({ ...prev, [category.slug]: e.target.value }))}
                  className="w-48 py-1.5"
                />
              </Td>
              <Td>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={savingSlug === category.slug}
                    onClick={() => handleSave(category.slug)}
                    className="text-xs font-semibold text-maroon-600 hover:underline disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    aria-label="Delete category"
                    disabled={deletingSlug === category.slug}
                    onClick={() => handleDelete(category.slug)}
                    className="text-neutral-400 hover:text-danger-500 disabled:opacity-40"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
