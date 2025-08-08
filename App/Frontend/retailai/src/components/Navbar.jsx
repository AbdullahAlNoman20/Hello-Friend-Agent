import React from "react";
import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCart } from "@/lib/cartContext";

export function Navbar() {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            retailAI
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className="font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                href="/chatbot"
                className="font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button className="text-foreground hover:text-muted-foreground transition-colors">
            <Search size={20} />
          </button>
          <button className="text-foreground hover:text-muted-foreground transition-colors relative">
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          <button className="hidden md:block rounded-full bg-primary px-5 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Sign In
          </button>
          <button className="md:hidden text-foreground hover:text-muted-foreground transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
