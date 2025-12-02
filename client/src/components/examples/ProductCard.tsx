import ProductCard from "../ProductCard";
import { menuItems } from "@/lib/menu-data";

export default function ProductCardExample() {
  const product = menuItems[0];

  return (
    <div className="max-w-sm">
      <ProductCard
        product={product}
        onAddToCart={(p) => console.log("Add to cart:", p.name)}
      />
    </div>
  );
}
