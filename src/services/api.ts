import { ApiResponse, Product } from "@/types";

const API_KEY = "97bb8ade4fe36cbbd44164f2a2bf025c";
const FORM_ID = "251073656660963";
const BASE_URL = `https://api.jotform.com/form/${FORM_ID}/payment-info?apiKey=${API_KEY}`;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    
    const data: ApiResponse = await response.json();
    
    // Extract products from the Jotform response
    // Map the data to our Product interface
    const products: Product[] = [];
    
    if (data && data.content && data.content.products) {
      Object.entries(data.content.products).forEach(([id, productData]: [string, any]) => {
        // Parse image URL from the JSON string in the response
        let imageUrl = "";
        try {
          if (productData.images) {
            const imagesArray = JSON.parse(productData.images);
            if (imagesArray && imagesArray.length > 0) {
              // Use the first image URL from the array
              imageUrl = imagesArray[0];
            }
          }
        } catch (err) {
          console.error("Error parsing image URL:", err);
        }

        const product: Product = {
          id: id,
          name: productData.name || "Unnamed Product",
          description: productData.description || "",
          price: parseFloat(productData.price) || 0,
          image: imageUrl,
          category: productData.type || "General",
          inStock: true,
          createdAt: new Date().toISOString(),
        };
        products.push(product);
      });
    }
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};