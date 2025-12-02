import { useState } from "react";
import CategoryNav from "../CategoryNav";
import type { CategoryId } from "@/lib/menu-data";

export default function CategoryNavExample() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  return (
    <CategoryNav
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
    />
  );
}
