// api.ts

import axios from "axios";

const BASE_URL = "http://localhost:3002/api/v1";

export const api = {
  getProducts: async () => {
    try {
      const response = await axios.get<any[]>(`${BASE_URL}/product`);
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      throw error;
    }
  },

  createProduct: async (name: any) => {
    const product = {
      ...name,
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
      console.log("response", response);

      return response.data;
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  },
};
