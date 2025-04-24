import { useState } from "react";
import { Plus, Minus, Flower } from "lucide-react";
import { Button } from "../components/ui/button";
import { Layout } from "../components/layout";
import { Link } from "react-router";
import { useCartStore } from "../store";
import groundcover from "@groundcover/browser";
export function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } =
    useCartStore();

  const handleCheckout = async () => {
    try {
      groundcover.sendCustomEvent({
        event: "checkout",
        attributes: {
          totalItems: cartTotal,
        },
      });
      setIsLoading(true);
      const res = await fetch("/api/checkout", { method: "POST" });
      if (res.ok) {
        alert("Order placed successfully!");
        clearCart();
      }
    } catch (err) {
      console.error("Error checking out:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const cartTotal = getTotalPrice();

  return (
    <Layout>
      <div className="w-full">
        <div className="mt-6 flex flex-col gap-4 px-4">
          {items.length === 0 ? (
            <div className="flex flex-col gap-8 items-center justify-center h-full w-full">
              <Flower className="h-10 w-10" />
              <div className="text-center text-muted-foreground flex gap-1">
                Your cart is empty.
                <Link to="/" className="text-pink-500">
                  Go check some flowers
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-pink-100"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1 || isLoading}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="w-8 text-center">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={isLoading}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                        onClick={() => removeItem(item.id)}
                        disabled={isLoading}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-pink-100">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <Button
                  className="w-full mt-4 bg-pink-600 hover:bg-pink-700"
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </Button>
              </div>
              <Link to="/" className="text-pink-500">
                Go back to the flowers
              </Link>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
