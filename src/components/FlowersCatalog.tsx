import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useCartStore } from "../store";
import groundcover from "@groundcover/browser";
type Flower = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export function FlowersCatalog() {
  const [flowers, setFlowers] = useState<Flower[]>();
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchFlowers();
  }, []);

  const fetchFlowers = async () => {
    try {
      const res = await fetch("/api/flowers");
      const data = await res.json();
      if (data && data.length) {
        setFlowers(data);
      }
    } catch (err) {
      console.error("Error fetching flowers:", err);
      // Keep the default flowers if fetch fails
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (flower: Flower) => {
    groundcover.sendCustomEvent({
      event: "add_flower_to_cart",
      attributes: {
        flowerId: flower.id,
        flowerName: flower.name,
      },
    });

    console.log(`Adding Flower to Cart: ${flower.name}`);
    if (flower.name === "Sunflower") {
      throw new Error("Sunflower are not available");
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flowerId: flower.id,
          quantity: 1,
          totalPrice: flower.price,
        }),
      });

      if (res.ok) {
        addItem({
          id: flower.id.toString(),
          name: flower.name,
          price: flower.price,
        });
        console.log("Flower added to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {flowers?.map((flower) => (
        <Card
          key={flower.id}
          aria-label={`Flower Item`}
          className={cn(
            "overflow-hidden transition-all duration-300 hover:shadow-md border-pink-100",
            "hover:translate-y-[-4px]"
          )}
        >
          <div className="aspect-square relative overflow-hidden bg-pink-50">
            <img
              src={flower.image || "/placeholder.svg"}
              alt={flower.name}
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-pink-800">
              {flower.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {flower.description}
            </p>
            <p className="text-lg font-medium text-pink-700 mt-2">
              ${flower.price?.toFixed(2)}
            </p>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button
              aria-label="Add to Cart"
              className="w-full bg-pink-600 hover:bg-pink-700"
              onClick={() => addToCart(flower)}
              disabled={isLoading}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
