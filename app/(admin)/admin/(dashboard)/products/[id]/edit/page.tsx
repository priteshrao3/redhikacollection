import { notFound } from "next/navigation";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductById, listCategories } from "@/lib/api/catalog";

export const metadata = { title: "Edit Product" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(id), listCategories()]);
  if (!product) notFound();

  return (
    <>
      <AdminTopbar title={`Edit Product`} subtitle={product.name} />
      <div className="p-6 sm:p-8">
        <ProductForm product={product} categories={categories} />
      </div>
    </>
  );
}
