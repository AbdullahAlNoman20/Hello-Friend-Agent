import { Card, CardContent } from "@/components/ui/card";
import { Package, BarChart3, Plus, Settings } from "lucide-react";

export function AdminStats({ products }) {
  const stats = [
    { title: "Total Products", value: products.length, icon: Package },
    {
      title: "Active Products",
      value: products.filter((p) => p.isOnline).length,
      icon: BarChart3,
    },
    {
      title: "New Arrivals",
      value: products.filter((p) => p.newArrival).length,
      icon: Plus,
    },
    {
      title: "Coming Soon",
      value: products.filter((p) => p.comingSoon).length,
      icon: Settings,
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
