// reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, addNewOrder, updateOrder, deleteOrder } from "./actions"; // path to your actions file

const ordersSlice = createSlice({
  name: "orders",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    // ... any other synchronous reducers ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload as any;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(addNewOrder.fulfilled, (state: any, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state: any, action: any) => {
        const index = state.data.findIndex(
          (order: any) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (order: any) => order.id !== action.payload
        );
      });
  },
});

export default ordersSlice.reducer;
