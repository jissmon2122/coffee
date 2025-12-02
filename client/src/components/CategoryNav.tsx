import { Coffee, Flame, Snowflake, Croissant } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categories, type CategoryId } from "@/lib/menu-data";

interface CategoryNavProps {
  activeCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
}

const iconMap = {
  Coffee,
  Flame,
  Snowflake,
  Croissant,
};

export default function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <nav className="sticky top-16 md:top-20 z-40 bg-background border-b py-3">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            const isActive = activeCategory === category.id;
            
            return (
              <Badge
                key={category.id}
                variant={isActive ? "default" : "secondary"}
                className={`cursor-pointer px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors flex items-center gap-2 ${
                  isActive ? "" : "bg-secondary"
                }`}
                onClick={() => onCategoryChange(category.id)}
                data-testid={`badge-category-${category.id}`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Badge>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
