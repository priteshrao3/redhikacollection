import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { AddProductButton } from "@/components/admin/AddProductButton";
import { getAllProducts } from "@/lib/api/catalog";

export const metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      <AdminTopbar title="Product Management" subtitle={`${products.length} products across 4 categories`} />
      <div className="p-6 sm:p-8">
        <div className="mb-4 flex justify-end">
          <AddProductButton />
        </div>
        <ProductsTable products={products} />
      </div>
    </>
  );
}
