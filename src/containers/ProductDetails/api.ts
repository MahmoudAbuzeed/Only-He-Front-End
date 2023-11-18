// api.ts

import axios from "axios";

const BASE_URL = "http://localhost:3002/api/v1";

export const api = {
  getProductById: async (id: number) => {
    console.log("id", id);
    try {
      const response = await axios.get<any>(`${BASE_URL}/product/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw error;
    }
  },

  createProduct: async (newProduct: any) => {
    const product = {
      ...newProduct,
      image: "src/assets/images/1.jpg",
    };

    try {
      const response = await axios.post<any>(`${BASE_URL}/product`, product);
      return response.data;
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  },

  updateProduct: async (product: any) => {
    const productToUpdate = {
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      offer: product.offer,
      original_price: product.original_price,
      customer_price: product.customer_price,
      image: product.image,
    };
    try {
      const response = await axios.patch<any>(
        `${BASE_URL}/product/${product.id}`,
        productToUpdate
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  },

  deleteProduct: async (id: number) => {
    try {
      const response = await axios.delete<any>(`${BASE_URL}/product/${id}`);

      return response.data;
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  },
};
