import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/lib/cart-context";

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartPanel({ isOpen, onClose, onCheckout }: CartPanelProps) {
  const { items, removeItem, updateQuantity, subtotal, tax, total, clearCart } = useCart();

  const formatCustomization = (item: typeof items[0]) => {
    const parts = [];
    parts.push(item.customization.size.charAt(0).toUpperCase() + item.customization.size.slice(1));
    if (item.customization.milk !== "none") {
      parts.push(item.customization.milk.charAt(0).toUpperCase() + item.customization.milk.slice(1) + " milk");
    }
    if (item.customization.extras.length > 0) {
      parts.push(...item.customization.extras.map(e => 
        e.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      ));
    }
    return parts.join(", ");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-xl flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Your Order
            </SheetTitle>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-muted-foreground"
                data-testid="button-clear-cart"
              >
                Clear All
              </Button>
            )}
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2" data-testid="text-empty-cart">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground text-sm">
              Add some delicious items to get started!
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-lg bg-card border"
                    data-testid={`cart-item-${item.id}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium truncate" data-testid={`text-cart-item-name-${item.id}`}>
                          {item.name}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 h-6 w-6"
                          onClick={() => removeItem(item.id)}
                          data-testid={`button-remove-item-${item.id}`}
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {formatCustomization(item)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            data-testid={`button-cart-decrease-${item.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 text-center text-sm" data-testid={`text-cart-quantity-${item.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            data-testid={`button-cart-increase-${item.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-medium text-sm" data-testid={`text-cart-item-price-${item.id}`}>
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-cart-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span data-testid="text-cart-tax">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span data-testid="text-cart-total">${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={onCheckout}
                data-testid="button-checkout"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
