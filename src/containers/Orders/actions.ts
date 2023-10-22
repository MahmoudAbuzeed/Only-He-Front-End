// ordersSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

interface OrdersState {
  data: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrdersState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await api.getOrders();
  return response;
});

export const addNewOrder = createAsyncThunk(
  "orders/addNewOrders",
  async (name: any) => {
    console.log("name", name);
    const response = await api.createOrder(name);
    return response;
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (order: { id: number; name: string }) => {
    const response = await api.updateOrder(order);
    return response;
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id: number) => {
    const response = await api.deleteOrder(id);
    return response;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(addNewOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(addNewOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
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
        state.data = state.data.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      });
  },
});

export default ordersSlice.reducer;
