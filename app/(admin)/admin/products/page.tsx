import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { AddProductButton } from "@/components/admin/AddProductButton";
import { PRODUCTS } from "@/data/products";

export const metadata = { title: "Products" };

export default function AdminProductsPage() {
  return (
    <>
      <AdminTopbar title="Product Management" subtitle={`${PRODUCTS.length} products across 4 categories`} />
      <div className="p-6 sm:p-8">
        <div className="mb-4 flex justify-end">
          <AddProductButton />
        </div>
        <ProductsTable products={PRODUCTS} />
      </div>
    </>
  );
}
