import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AddProductButton() {
  return (
    <Button href="/admin/products/new">
      <Plus size={16} /> Add New Product
    </Button>
  );
}
