import ProductGrid from "../ProductGrid";
import { menuItems } from "@/lib/menu-data";

export default function ProductGridExample() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <ProductGrid
        products={menuItems.slice(0, 3)}
        onAddToCart={(p) => console.log("Add to cart:", p.name)}
      />
    </div>
  );
}
