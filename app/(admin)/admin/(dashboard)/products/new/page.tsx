import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ProductForm } from "@/components/admin/ProductForm";
import { listCategories } from "@/lib/api/catalog";

export const metadata = { title: "Add Product" };

export default async function NewProductPage() {
  const categories = await listCategories();

  return (
    <>
      <AdminTopbar title="Add New Product" />
      <div className="p-6 sm:p-8">
        <ProductForm categories={categories} />
      </div>
    </>
  );
}
