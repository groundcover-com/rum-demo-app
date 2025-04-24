import { Flower } from "lucide-react";
import { Header } from "./header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        <div className="max-w-2xl mx-auto my-10 text-center">
          <h2 className="text-3xl font-bold text-pink-800 mb-4">
            Fresh Blooms, Delivered with Love
          </h2>
          <p className="text-muted-foreground">
            Discover our handpicked selection of beautiful flowers for every
            occasion. Each bouquet is crafted with care and delivered fresh to
            your doorstep.
          </p>
        </div>

        {children}
      </div>
      <footer className="mt-20 border-t border-pink-100 bg-white py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2 mb-2">
            <Flower className="h-4 w-4 text-pink-500" />
            Bloom & Blossom Flower Shop
          </p>
          <p className="text-sm">
            Bringing joy through beautiful blooms since 2023
          </p>
        </div>
      </footer>
    </div>
  );
}
