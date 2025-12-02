import latteImg from "@assets/generated_images/latte_with_art.png";
import icedCoffeeImg from "@assets/generated_images/iced_coffee_drink.png";
import cappuccinoImg from "@assets/generated_images/cappuccino_with_foam.png";
import espressoImg from "@assets/generated_images/espresso_shot.png";
import mochaImg from "@assets/generated_images/mocha_with_cream.png";
import croissantImg from "@assets/generated_images/fresh_golden_croissant.png";
import muffinImg from "@assets/generated_images/blueberry_muffin.png";
import cookieImg from "@assets/generated_images/chocolate_chip_cookie.png";
import coldBrewImg from "@assets/generated_images/cold_brew_coffee.png";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  category: "hot" | "cold" | "pastries";
  image: string;
  customizable: boolean;
}

// todo: remove mock functionality - replace with API data
export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Latte",
    description: "Smooth espresso with steamed milk and a light layer of foam. Our most popular drink.",
    basePrice: 4.50,
    category: "hot",
    image: latteImg,
    customizable: true,
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and velvety foam. Italian perfection.",
    basePrice: 4.25,
    category: "hot",
    image: cappuccinoImg,
    customizable: true,
  },
  {
    id: 3,
    name: "Espresso",
    description: "Rich, bold shot of our signature espresso blend with perfect crema.",
    basePrice: 3.00,
    category: "hot",
    image: espressoImg,
    customizable: true,
  },
  {
    id: 4,
    name: "Mocha",
    description: "Espresso meets chocolate, topped with whipped cream and cocoa drizzle.",
    basePrice: 5.25,
    category: "hot",
    image: mochaImg,
    customizable: true,
  },
  {
    id: 5,
    name: "Iced Latte",
    description: "Chilled espresso with cold milk over ice. Refreshingly smooth.",
    basePrice: 4.75,
    category: "cold",
    image: icedCoffeeImg,
    customizable: true,
  },
  {
    id: 6,
    name: "Cold Brew",
    description: "Slow-steeped for 20 hours. Smooth, bold, and naturally sweet.",
    basePrice: 4.50,
    category: "cold",
    image: coldBrewImg,
    customizable: true,
  },
  {
    id: 7,
    name: "Butter Croissant",
    description: "Flaky, golden layers of buttery French pastry. Baked fresh daily.",
    basePrice: 3.50,
    category: "pastries",
    image: croissantImg,
    customizable: false,
  },
  {
    id: 8,
    name: "Blueberry Muffin",
    description: "Bursting with fresh blueberries and topped with crunchy sugar crystals.",
    basePrice: 3.75,
    category: "pastries",
    image: muffinImg,
    customizable: false,
  },
  {
    id: 9,
    name: "Chocolate Chip Cookie",
    description: "Warm, chewy cookie loaded with premium chocolate chips.",
    basePrice: 2.50,
    category: "pastries",
    image: cookieImg,
    customizable: false,
  },
];

export const categories = [
  { id: "all", name: "All Items", icon: "Coffee" },
  { id: "hot", name: "Hot Drinks", icon: "Flame" },
  { id: "cold", name: "Cold Drinks", icon: "Snowflake" },
  { id: "pastries", name: "Pastries", icon: "Croissant" },
] as const;

export type CategoryId = typeof categories[number]["id"];
