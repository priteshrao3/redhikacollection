import { formatPrice } from "@/lib/format";

export function OrderSummary({
  subtotal,
  itemCount,
  onCheckout,
}: {
  subtotal: number;
  itemCount: number;
  onCheckout?: () => void;
}) {
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const discount = subtotal >= 5000 ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="rounded-xl border border-neutral-200 p-5">
      <h2 className="mb-4 text-base font-semibold text-navy-900">
        Order Summary ({itemCount} {itemCount === 1 ? "Item" : "Items"})
      </h2>
      <dl className="space-y-2.5 text-sm">
        <div className="flex justify-between text-neutral-600">
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-neutral-600">
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? "FREE" : formatPrice(shipping)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success-500">
            <dt>Discount</dt>
            <dd>-{formatPrice(discount)}</dd>
          </div>
        )}
      </dl>
      <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-base font-bold text-navy-900">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      <button
        type="button"
        disabled={itemCount === 0}
        onClick={onCheckout}
        className="mt-5 w-full rounded-md bg-maroon-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        PROCEED TO CHECKOUT
      </button>
      <p className="mt-3 text-center text-xs text-neutral-400">We Accept: Visa · Mastercard · UPI · COD</p>
    </div>
  );
}
