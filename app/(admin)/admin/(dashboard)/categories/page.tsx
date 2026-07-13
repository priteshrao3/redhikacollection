import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { listCategories } from "@/lib/api/catalog";

export const metadata = { title: "Categories" };

export default async function AdminCategoriesPage() {
  const categories = await listCategories();

  return (
    <>
      <AdminTopbar title="Categories" subtitle={`${categories.length} categories`} />
      <div className="p-6 sm:p-8">
        <CategoriesManager categories={categories} />
      </div>
    </>
  );
}
