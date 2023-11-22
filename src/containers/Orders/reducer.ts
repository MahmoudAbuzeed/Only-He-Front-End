// reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, addNewOrder } from "./actions"; // path to your actions file

const ordersSlice = createSlice({
  name: "orders",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
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
      });
  },
});

export default ordersSlice.reducer;
