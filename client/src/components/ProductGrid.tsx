import ProductCard from "./ProductCard";
import type { MenuItem } from "@/lib/menu-data";

interface ProductGridProps {
  products: MenuItem[];
  onAddToCart: (product: MenuItem) => void;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12" data-testid="text-no-products">
        <p className="text-muted-foreground">No items found in this category.</p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-testid="grid-products"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
