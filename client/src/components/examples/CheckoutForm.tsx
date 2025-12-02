import { useEffect } from "react";
import { CartProvider, useCart } from "@/lib/cart-context";
import CheckoutForm from "../CheckoutForm";
import latteImg from "@assets/generated_images/latte_with_art.png";

function CheckoutFormInner() {
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
    <CheckoutForm
      onBack={() => console.log("Back clicked")}
      onOrderComplete={(orderNumber) => console.log("Order complete:", orderNumber)}
    />
  );
}

export default function CheckoutFormExample() {
  return (
    <CartProvider>
      <CheckoutFormInner />
    </CartProvider>
  );
}
