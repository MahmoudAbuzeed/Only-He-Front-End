import axios from "axios";
import { BASE_URL } from "../shared/configs";

export const api = {
  getOrderById: async (id: number) => {
    try {
      const response = await axios.get<any>(`${BASE_URL}/order/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch order:", error);
      throw error;
    }
  },
  updateOrder: async (order: any) => {
    const orderToUpdate = {
      id: order.id,
      status: order.status,
      total_price: order.total_price,
      created_at: order.created_at,
      orderItems: order.orderItems,
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

  cancelOrder: async (orderId: number) => {
    try {
      const response = await axios.post<any>(
        `${BASE_URL}/order/${orderId}/cancel`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to cancel order:", error);
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
