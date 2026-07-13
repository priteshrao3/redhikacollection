import { CartProvider } from "@/context/CartContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { ToastHost } from "@/components/shop/Toast";
import { getCurrentUser } from "@/lib/server/session";
import { getSiteSettings, listSocialLinks } from "@/lib/api/content";
import { listCategories } from "@/lib/api/catalog";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const [user, settings, socialLinks, categories] = await Promise.all([
    getCurrentUser(),
    getSiteSettings(),
    listSocialLinks(),
    listCategories(),
  ]);
  return (
    <SiteSettingsProvider settings={settings}>
      <CartProvider>
        <Header user={user} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} socialLinks={socialLinks} categories={categories} />
        <ToastHost />
      </CartProvider>
    </SiteSettingsProvider>
  );
}
