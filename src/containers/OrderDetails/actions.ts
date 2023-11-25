// ordersSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

interface OrderState {
  data: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  data: {},
  status: "idle",
  error: null,
};

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id: number) => {
    const response = await api.getOrderById(id);
    return response;
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (order: any) => {
    const response = await api.updateOrder(order);
    return response;
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId: number) => {
    const response = await api.cancelOrder(orderId);
    return response;
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id: number) => {
    const response = await api.deleteOrder(id);
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      });
  },
});

export default orderSlice.reducer;
