import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { MenuItem } from "@/lib/menu-data";

interface ProductCardProps {
  product: MenuItem;
  onAddToCart: (product: MenuItem) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate transition-shadow"
      data-testid={`card-product-${product.id}`}
    >
      <AspectRatio ratio={4 / 3}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          data-testid={`img-product-${product.id}`}
        />
      </AspectRatio>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 
            className="font-serif text-lg font-semibold"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
          <span 
            className="text-sm font-medium text-primary whitespace-nowrap"
            data-testid={`text-product-price-${product.id}`}
          >
            ${product.basePrice.toFixed(2)}
          </span>
        </div>
        <p 
          className="text-sm text-muted-foreground line-clamp-2 mb-4"
          data-testid={`text-product-description-${product.id}`}
        >
          {product.description}
        </p>
        <Button
          className="w-full"
          onClick={() => onAddToCart(product)}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <Plus className="w-4 h-4 mr-2" />
          {product.customizable ? "Customize" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}
