import React from "react";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products = [] }) {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our selection of AI-enhanced products designed to make
              your life easier and more connected.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="font-medium text-primary hover:text-primary/80 flex items-center">
              View all products
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.length > 0 ? (
            products.map((product) => {
              console.log('Rendering product:', product);
              return <ProductCard key={product.id} product={product} />;
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No products found</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ArrowRight(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
