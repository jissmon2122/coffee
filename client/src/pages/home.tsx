import { useState, useRef, useMemo } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryNav from "@/components/CategoryNav";
import ProductGrid from "@/components/ProductGrid";
import CustomizationModal from "@/components/CustomizationModal";
import CartPanel from "@/components/CartPanel";
import CheckoutForm from "@/components/CheckoutForm";
import OrderConfirmation from "@/components/OrderConfirmation";
import { useCart } from "@/lib/cart-context";
import { menuItems, type CategoryId, type MenuItem } from "@/lib/menu-data";
import type { CartItemCustomization } from "@/lib/cart-context";

type AppView = "menu" | "checkout" | "confirmation";

interface HomeProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Home({ isDarkMode, onToggleDarkMode }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [currentView, setCurrentView] = useState<AppView>("menu");
  const [orderNumber, setOrderNumber] = useState("");
  
  const { addItem } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleExploreClick = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (product: MenuItem) => {
    if (product.customizable) {
      setSelectedProduct(product);
    } else {
      addItem({
        productId: product.id,
        name: product.name,
        image: product.image,
        basePrice: product.basePrice,
        quantity: 1,
        customization: {
          size: "medium",
          milk: "none",
          extras: [],
          sweetness: 50,
        },
        totalPrice: product.basePrice,
      });
    }
  };

  const handleCustomizedAddToCart = (
    product: MenuItem,
    customization: CartItemCustomization,
    quantity: number,
    totalPrice: number
  ) => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      basePrice: product.basePrice,
      quantity,
      customization,
      totalPrice,
    });
  };

  const handleOrderComplete = (orderNum: string) => {
    setOrderNumber(orderNum);
    setCurrentView("confirmation");
  };

  const handleBackToMenu = () => {
    setCurrentView("menu");
    setOrderNumber("");
  };

  if (currentView === "checkout") {
    return (
      <CheckoutForm
        onBack={handleBackToMenu}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  if (currentView === "confirmation") {
    return (
      <OrderConfirmation
        orderNumber={orderNumber}
        onViewMenu={handleBackToMenu}
        onOrderAgain={handleBackToMenu}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={onToggleDarkMode}
      />

      <HeroSection onExploreClick={handleExploreClick} />

      <div ref={menuRef}>
        <CategoryNav
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <h2 className="font-serif text-3xl font-bold" data-testid="text-menu-title">
            Our Menu
          </h2>
          <p className="text-muted-foreground mt-2">
            Crafted with care, served with love
          </p>
        </div>

        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Brew Haven. All rights reserved.
          </p>
        </div>
      </footer>

      <CustomizationModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleCustomizedAddToCart}
      />

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentView("checkout");
        }}
      />
    </div>
  );
}
