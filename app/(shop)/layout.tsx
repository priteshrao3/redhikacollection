import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { ToastHost } from "@/components/shop/Toast";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ToastHost />
    </CartProvider>
  );
}
