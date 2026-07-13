import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CheckoutForm } from "@/components/shop/CheckoutForm";
import { getCurrentUser } from "@/lib/server/session";

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="mt-3 font-display text-2xl text-navy-900">Checkout</h1>
      <CheckoutForm initialName={user?.name ?? ""} initialEmail={user?.email ?? ""} />
    </div>
  );
}
