import { useState, useMemo } from "react";
import { X, Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import type { MenuItem } from "@/lib/menu-data";
import type { CartItemCustomization } from "@/lib/cart-context";

interface CustomizationModalProps {
  product: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    product: MenuItem,
    customization: CartItemCustomization,
    quantity: number,
    totalPrice: number
  ) => void;
}

const sizeOptions = [
  { value: "small", label: "Small", priceModifier: 0 },
  { value: "medium", label: "Medium", priceModifier: 0.50 },
  { value: "large", label: "Large", priceModifier: 1.00 },
] as const;

const milkOptions = [
  { value: "whole", label: "Whole Milk", priceModifier: 0 },
  { value: "skim", label: "Skim Milk", priceModifier: 0 },
  { value: "oat", label: "Oat Milk", priceModifier: 0.60 },
  { value: "almond", label: "Almond Milk", priceModifier: 0.60 },
  { value: "none", label: "No Milk", priceModifier: 0 },
] as const;

const extraOptions = [
  { value: "extra-shot", label: "Extra Shot", price: 0.75 },
  { value: "whipped-cream", label: "Whipped Cream", price: 0.50 },
  { value: "caramel-drizzle", label: "Caramel Drizzle", price: 0.50 },
  { value: "chocolate-drizzle", label: "Chocolate Drizzle", price: 0.50 },
  { value: "vanilla-syrup", label: "Vanilla Syrup", price: 0.60 },
] as const;

export default function CustomizationModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: CustomizationModalProps) {
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [milk, setMilk] = useState<"whole" | "skim" | "oat" | "almond" | "none">("whole");
  const [extras, setExtras] = useState<string[]>([]);
  const [sweetness, setSweetness] = useState([50]);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    
    const sizePrice = sizeOptions.find(s => s.value === size)?.priceModifier ?? 0;
    const milkPrice = milkOptions.find(m => m.value === milk)?.priceModifier ?? 0;
    const extrasPrice = extras.reduce((sum, extra) => {
      const option = extraOptions.find(e => e.value === extra);
      return sum + (option?.price ?? 0);
    }, 0);
    
    return (product.basePrice + sizePrice + milkPrice + extrasPrice) * quantity;
  }, [product, size, milk, extras, quantity]);

  const handleExtraToggle = (extraValue: string) => {
    setExtras(prev =>
      prev.includes(extraValue)
        ? prev.filter(e => e !== extraValue)
        : [...prev, extraValue]
    );
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    onAddToCart(
      product,
      { size, milk, extras, sweetness: sweetness[0] },
      quantity,
      totalPrice
    );
    
    setSize("medium");
    setMilk("whole");
    setExtras([]);
    setSweetness([50]);
    setQuantity(1);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            data-testid="img-customization-product"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white"
            onClick={onClose}
            data-testid="button-close-customization"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <DialogHeader className="space-y-1 p-0">
            <DialogTitle className="font-serif text-2xl" data-testid="text-customization-title">
              {product.name}
            </DialogTitle>
            <p className="text-muted-foreground" data-testid="text-customization-description">
              {product.description}
            </p>
          </DialogHeader>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base font-semibold">Size</Label>
            <RadioGroup
              value={size}
              onValueChange={(v) => setSize(v as typeof size)}
              className="flex flex-wrap gap-3"
            >
              {sizeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-between px-4 py-3 border rounded-md cursor-pointer flex-1 min-w-[100px] transition-colors ${
                    size === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  data-testid={`radio-size-${option.value}`}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <span>{option.label}</span>
                  </div>
                  {option.priceModifier > 0 && (
                    <span className="text-sm text-muted-foreground">
                      +${option.priceModifier.toFixed(2)}
                    </span>
                  )}
                </label>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base font-semibold">Milk</Label>
            <RadioGroup
              value={milk}
              onValueChange={(v) => setMilk(v as typeof milk)}
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
            >
              {milkOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-between px-4 py-3 border rounded-md cursor-pointer transition-colors ${
                    milk === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  data-testid={`radio-milk-${option.value}`}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value={option.value} id={`milk-${option.value}`} />
                    <span className="text-sm">{option.label}</span>
                  </div>
                  {option.priceModifier > 0 && (
                    <span className="text-xs text-muted-foreground">
                      +${option.priceModifier.toFixed(2)}
                    </span>
                  )}
                </label>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base font-semibold">Extras</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {extraOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-between px-4 py-3 border rounded-md cursor-pointer transition-colors ${
                    extras.includes(option.value)
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                  data-testid={`checkbox-extra-${option.value}`}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={extras.includes(option.value)}
                      onCheckedChange={() => handleExtraToggle(option.value)}
                    />
                    <span className="text-sm">{option.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    +${option.price.toFixed(2)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Sweetness</Label>
              <span className="text-sm text-muted-foreground" data-testid="text-sweetness-value">
                {sweetness[0]}%
              </span>
            </div>
            <Slider
              value={sweetness}
              onValueChange={setSweetness}
              max={100}
              step={25}
              className="w-full"
              data-testid="slider-sweetness"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Less Sweet</span>
              <span>Normal</span>
              <span>Extra Sweet</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Quantity</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                data-testid="button-decrease-quantity"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-medium" data-testid="text-quantity">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                data-testid="button-increase-quantity"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 p-4 border-t bg-background">
          <Button
            className="w-full"
            size="lg"
            onClick={handleAddToCart}
            data-testid="button-add-customized"
          >
            Add to Cart - ${totalPrice.toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
