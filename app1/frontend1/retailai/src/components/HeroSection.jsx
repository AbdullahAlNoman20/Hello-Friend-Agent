import React from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          flickerChance={0.3}
          color="rgb(0, 0, 0)"
          maxOpacity={0.3}
          className="h-full w-full"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Smart Retail Solutions{" "}
            <span className="text-primary">Powered by AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Discover products curated specifically for you through our advanced
            AI recommendation engine. Get personalized shopping assistance with
            our AI chatbot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-primary/90">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-border text-foreground px-6 py-3 rounded-md font-medium hover:bg-muted flex items-center justify-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Try AI Assistant
            </button>
          </div>
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-medium text-primary">
              New: AI-powered shopping assistant now available!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
