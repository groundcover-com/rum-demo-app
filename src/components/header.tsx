import { Flower, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router";
import { useCartStore } from "../store";
import { useMemo } from "react";

export function Header() {
  const items = useCartStore((state) => state.items);
  const cartItemCount = useMemo(() => items.length, [items]);

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flower className="h-6 w-6 text-pink-500" />
          <h1 className="text-2xl font-bold text-pink-700">Bloom & Blossom</h1>
        </div>

        <Link to="/cart" aria-label="shopping cart">
          <Button variant="outline" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-pink-500">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
}
