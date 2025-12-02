import { Coffee, ShoppingCart, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";

interface HeaderProps {
  onCartClick: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ onCartClick, isDarkMode, onToggleDarkMode }: HeaderProps) {
  const { itemCount, total } = useCart();

  return (
    <header className="sticky top-0 z-50 h-16 md:h-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Coffee className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold" data-testid="text-brand-name">Brew Haven</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Artisan Coffee</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            data-testid="button-toggle-theme"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          <Button
            variant="outline"
            className="relative flex items-center gap-2"
            onClick={onCartClick}
            data-testid="button-open-cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">
              ${total.toFixed(2)}
            </span>
            {itemCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                data-testid="badge-cart-count"
              >
                {itemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
