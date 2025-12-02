import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@assets/generated_images/cozy_coffee_shop_interior.png";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center">
        <h2 
          className="font-serif text-4xl md:text-5xl font-bold text-white mb-4"
          data-testid="text-hero-title"
        >
          Crafted with Passion
        </h2>
        <p 
          className="text-lg md:text-xl text-white/90 max-w-2xl mb-8"
          data-testid="text-hero-subtitle"
        >
          Experience the perfect brew. Artisan coffee made fresh, just for you. 
          Order ahead and skip the line.
        </p>
        <Button
          size="lg"
          onClick={onExploreClick}
          className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold"
          data-testid="button-explore-menu"
        >
          Explore Our Menu
          <ChevronDown className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
}
