import axios from "axios";
import { BASE_URL } from "../shared/configs";

interface Category {
  id: number;
  name: string;
}

export const api = {
  getCategories: async () => {
    try {
      const response = await axios.get<Category[]>(`${BASE_URL}/category`);
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  },

  createCategory: async (name: any) => {
    const category = {
      ...name,
      image: "src/assets/images/1.jpg",
    };

    try {
      const response = await axios.post<Category>(
        `${BASE_URL}/category`,
        category
      );
      return response.data;
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  },

  updateCategory: async (category: any) => {
    const categoryToUpdate = {
      name: category.name,
      image: category.image,
    };
    try {
      const response = await axios.patch<Category>(
        `${BASE_URL}/category/${category.id}`,
        categoryToUpdate
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  },

  deleteCategory: async (id: number) => {
    try {
      const response = await axios.delete<Category>(
        `${BASE_URL}/category/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  },
};
