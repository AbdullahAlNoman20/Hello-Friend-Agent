import React from "react";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cartContext";

export function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  // Debug: Log product data
  console.log("ProductCard rendered with product:", product);

  const handleProductClick = () => {
    console.log("Product clicked:", product);
    console.log("Product ID:", product.id);
    if (product.id) {
      router.push(`/products/product/${product.id}`);
    } else {
      console.error("Product ID is missing:", product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Add to cart clicked for:", product.productname);

    // Add the product to cart
    addToCart(product, 1);

    // Show alert
    alert(`${product.productname} has been added to your cart!`);
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border group">
      {/* Product Image - Clickable */}
      <div
        className="aspect-square overflow-hidden bg-muted relative cursor-pointer"
        onClick={handleProductClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleProductClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${product.productname}`}
      >
        <img
          src={product.image || "/product.jpg"}
          alt={product.productname}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Eye className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Product details - Clickable but NOT the button area */}
        <div className="cursor-pointer mb-4" onClick={handleProductClick}>
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              (4.5 out of 5)
            </span>
          </div>
          <h3 className="font-bold text-lg mb-1 text-card-foreground group-hover:text-primary transition-colors">
            {product.productname}
          </h3>
          <p className="font-bold text-xl text-card-foreground">
            ${product.price || "Price not available"}
          </p>
        </div>

        {/* Add to Cart Button - Isolated from other click handlers */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          type="button"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
