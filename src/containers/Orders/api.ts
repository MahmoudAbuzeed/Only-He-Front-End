import axios from "axios";
import { BASE_URL } from "../shared/configs";

export const api = {
  getOrders: async () => {
    try {
      const response = await axios.get<any[]>(`${BASE_URL}/order`);
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      throw error;
    }
  },

  createOrder: async (name: any) => {
    const order = {
      ...name,
      image: "src/assets/images/1.jpg",
    };

    try {
      const response = await axios.post<any>(`${BASE_URL}/order`, order);
      return response.data;
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  },

  updateOrder: async (order: any) => {
    const orderToUpdate = {
      name: order.name,
      image: order.image,
    };
    try {
      const response = await axios.patch<any>(
        `${BASE_URL}/order/${order.id}`,
        orderToUpdate
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  },

  deleteOrder: async (id: number) => {
    try {
      const response = await axios.delete<any>(`${BASE_URL}/order/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  },
};
