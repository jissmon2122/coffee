import { useState } from "react";
import { CartProvider } from "@/lib/cart-context";
import Header from "../Header";

export default function HeaderExample() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <CartProvider>
      <Header
        onCartClick={() => console.log("Cart clicked")}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
    </CartProvider>
  );
}
