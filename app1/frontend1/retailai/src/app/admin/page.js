"use client";

import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminStats } from "../../components/admin/AdminStats";
import { ProductManagementTabs } from "../../components/admin/ProductManagementTabs";
import { StatusMessage } from "../../components/admin/StatusMessage";
import { ProductsList } from "../../components/admin/ProductsList";
import { processCSVFile } from "../../lib/csvProcessor";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("manual");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleManualSubmit = async (productData) => {
    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/footwear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const addedProduct = await response.json();
      setProducts([...products, { ...productData, id: Date.now() }]);
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error adding product:", error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleCsvSubmit = async (csvFile) => {
    setLoading(true);
    setSubmitStatus(null);

    try {
      const { products: csvProducts, errors } = await processCSVFile(csvFile);

      if (errors.length > 0) {
        console.error("CSV validation errors:", errors);
        setSubmitStatus("error");
        return;
      }

      // Add products one by one
      const addedProducts = [];
      for (const product of csvProducts) {
        const response = await fetch("/api/footwear", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        if (response.ok) {
          const addedProduct = await response.json();
          addedProducts.push({ ...product, id: Date.now() + Math.random() });
        }
      }

      setProducts([...products, ...addedProducts]);
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error processing CSV:", error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Admin Dashboard
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Manage your product catalog, add new items, and monitor your
                retail operations
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <AdminStats products={products} />

        {/* Product Management Section */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Product Management
                </CardTitle>
                <CardDescription>
                  Add new products to your catalog manually or upload via CSV
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Status Messages */}
                <StatusMessage status={submitStatus} />

                {/* Product Management Tabs */}
                <ProductManagementTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onManualSubmit={handleManualSubmit}
                  onCsvSubmit={handleCsvSubmit}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Products List */}
        <ProductsList products={products} />
      </main>
      <Footer />
    </div>
  );
}
