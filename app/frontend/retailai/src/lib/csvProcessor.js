export function parseCSV(csvText) {
  const lines = csvText.split("\n");
  const headers = lines[0].split(",").map((header) => header.trim());
  const products = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "") continue;

    const values = lines[i].split(",").map((value) => value.trim());
    const product = {};

    headers.forEach((header, index) => {
      let value = values[index] || "";

      // Handle boolean fields
      if (["comingSoon", "isOnline", "newArrival"].includes(header)) {
        value = value.toLowerCase() === "true" || value.toLowerCase() === "yes";
      }

      // Handle numeric fields
      if (header === "price") {
        value = parseFloat(value) || 0;
      }

      product[header] = value;
    });

    products.push(product);
  }

  return products;
}

export function validateProductData(product) {
  const requiredFields = ["price", "stockState", "colorName", "mainCatCode"];
  const errors = [];

  requiredFields.forEach((field) => {
    if (!product[field] || product[field] === "") {
      errors.push(`${field} is required`);
    }
  });

  if (product.price && isNaN(product.price)) {
    errors.push("Price must be a valid number");
  }

  return errors;
}

export function processCSVFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const csvText = e.target.result;
        const products = parseCSV(csvText);

        // Validate each product
        const validProducts = [];
        const errors = [];

        products.forEach((product, index) => {
          const productErrors = validateProductData(product);
          if (productErrors.length === 0) {
            validProducts.push(product);
          } else {
            errors.push(`Row ${index + 2}: ${productErrors.join(", ")}`);
          }
        });

        resolve({ products: validProducts, errors });
      } catch (error) {
        reject(new Error("Failed to parse CSV file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read CSV file"));
    };

    reader.readAsText(file);
  });
}
