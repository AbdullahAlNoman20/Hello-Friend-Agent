import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductsList({ products }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">
              Added Products
            </CardTitle>
            <CardDescription>Products added in this session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Product #{index + 1} - {product.colorName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Price: ${product.price} | Category:{" "}
                        {product.mainCatCode}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Stock: {product.stockState} | Online:{" "}
                        {product.isOnline ? "Yes" : "No"}
                      </p>
                      {product.details && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {product.details}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {product.newArrival && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          New Arrival
                        </span>
                      )}
                      {product.comingSoon && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
