import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface CartItemCustomization {
  size: "small" | "medium" | "large";
  milk: "whole" | "skim" | "oat" | "almond" | "none";
  extras: string[];
  sweetness: number;
}

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  image: string;
  basePrice: number;
  quantity: number;
  customization: CartItemCustomization;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    const id = `${item.productId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setItems((prev) => [...prev, { ...item, id }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity, totalPrice: (item.totalPrice / item.quantity) * quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
