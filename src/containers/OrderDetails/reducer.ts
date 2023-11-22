// reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { updateOrder, deleteOrder, fetchOrderById } from "./actions"; // path to your actions file

const ordersSlice = createSlice({
  name: "order",
  initialState: {
    data: {
      id: 0,
      status: "",
      total_price: 0,
      created_at: "",
      user: "",
      orderItems: [
        {
          id: 0,
          name: "",
          description: "",
          price: 0,
          quantity: 0,
          offer: 0,
          customer_price: 0,
          original_price: 0,
          created_at: "",
          updated_at: "",
        },
      ],
    },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload as any;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(updateOrder.fulfilled, (state: any, action: any) => {
        state.data = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default ordersSlice.reducer;
