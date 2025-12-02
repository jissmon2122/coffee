import { useState, useEffect } from "react";
import { CartProvider, useCart } from "@/lib/cart-context";
import CartPanel from "../CartPanel";
import { Button } from "@/components/ui/button";
import latteImg from "@assets/generated_images/latte_with_art.png";

function CartPanelInner() {
  const [isOpen, setIsOpen] = useState(true);
  const { addItem, items } = useCart();

  useEffect(() => {
    if (items.length === 0) {
      addItem({
        productId: 1,
        name: "Classic Latte",
        image: latteImg,
        basePrice: 4.50,
        quantity: 2,
        customization: {
          size: "medium",
          milk: "oat",
          extras: ["extra-shot"],
          sweetness: 50,
        },
        totalPrice: 11.70,
      });
    }
  }, []);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Cart</Button>
      <CartPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCheckout={() => console.log("Checkout clicked")}
      />
    </div>
  );
}

export default function CartPanelExample() {
  return (
    <CartProvider>
      <CartPanelInner />
    </CartProvider>
  );
}
