import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";

export function ManualProductForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    brandName: "",
    url: "",
    price: "",
    stockState: "",
    comingSoon: "false",
    colorName: "",
    isOnline: "true",
    colors: "",
    colorShades: "",
    newArrival: "false",
    mainCatCode: "",
    details: "",
    materials: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      price: parseFloat(formData.price),
      stockState: formData.stockState,
      comingSoon: formData.comingSoon === "true",
      colorName: formData.colorName,
      isOnline: formData.isOnline === "true",
      colors: formData.colors,
      colorShades: formData.colorShades,
      newArrival: formData.newArrival === "true",
      mainCatCode: formData.mainCatCode,
      details: formData.details,
      materials: formData.materials,
    };
    onSubmit(product);
    setFormData({
      price: "",
      stockState: "",
      comingSoon: "false",
      colorName: "",
      isOnline: "true",
      colors: "",
      colorShades: "",
      newArrival: "false",
      mainCatCode: "",
      details: "",
      materials: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="productId">Product ID</Label>
          <Input
            id="productId"
            name="productId"
            required
            placeholder="e.g., P001"
            disabled={loading}
            value={formData.productId}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            name="productName"
            required
            placeholder="e.g., Air Max"
            disabled={loading}
            value={formData.productName}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brandName">Brand Name</Label>
          <Input
            id="brandName"
            name="brandName"
            required
            placeholder="e.g., Nike"
            disabled={loading}
            value={formData.brandName}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">Product URL</Label>
          <Input
            id="url"
            name="url"
            required
            placeholder="e.g., https://example.com/image.jpg"
            disabled={loading}
            value={formData.url}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            required
            placeholder="Enter price"
            disabled={loading}
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stockState">Stock State</Label>
          <Input
            id="stockState"
            name="stockState"
            required
            placeholder="In stock, Out of stock, etc."
            disabled={loading}
            value={formData.stockState}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="colorName">Color Name</Label>
          <Input
            id="colorName"
            name="colorName"
            required
            placeholder="e.g., Black, Red, Blue"
            disabled={loading}
            value={formData.colorName}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="colors">Colors</Label>
          <Input
            id="colors"
            name="colors"
            placeholder="Primary color codes"
            disabled={loading}
            value={formData.colors}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="colorShades">Color Shades</Label>
          <Input
            id="colorShades"
            name="colorShades"
            placeholder="Available color variations"
            disabled={loading}
            value={formData.colorShades}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mainCatCode">Main Category Code</Label>
          <Input
            id="mainCatCode"
            name="mainCatCode"
            required
            placeholder="Category identifier"
            disabled={loading}
            value={formData.mainCatCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="materials">Materials</Label>
          <Input
            id="materials"
            name="materials"
            placeholder="Product materials"
            disabled={loading}
            value={formData.materials}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="comingSoon">Coming Soon</Label>
          <Select
            value={formData.comingSoon}
            onValueChange={(value) => handleSelectChange("comingSoon", value)}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="isOnline">Is Online</Label>
          <Select
            value={formData.isOnline}
            onValueChange={(value) => handleSelectChange("isOnline", value)}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="newArrival">New Arrival</Label>
          <Select
            value={formData.newArrival}
            onValueChange={(value) => handleSelectChange("newArrival", value)}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="details">Product Details</Label>
        <Textarea
          id="details"
          name="details"
          rows={4}
          placeholder="Enter product description and details..."
          disabled={loading}
          value={formData.details}
          onChange={handleInputChange}
        />
      </div>
      <Button type="submit" className="w-full md:w-auto" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Adding Product...
          </>
        ) : (
          <>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </>
        )}
      </Button>
    </form>
  );
}
