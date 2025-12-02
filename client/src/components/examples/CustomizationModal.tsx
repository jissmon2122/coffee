import { useState } from "react";
import CustomizationModal from "../CustomizationModal";
import { menuItems } from "@/lib/menu-data";
import { Button } from "@/components/ui/button";

export default function CustomizationModalExample() {
  const [isOpen, setIsOpen] = useState(true);
  const product = menuItems[0];

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Customization</Button>
      <CustomizationModal
        product={product}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddToCart={(product, customization, quantity, totalPrice) => {
          console.log("Added to cart:", { product: product.name, customization, quantity, totalPrice });
          setIsOpen(false);
        }}
      />
    </div>
  );
}
