// reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  addNewProduct,
  deleteProduct,
  fetchProductById,
  updateProduct,
} from "./actions";

const productDetailsSlice = createSlice({
  name: "product",
  initialState: {
    data: {
      id: 0,
      name: "",
      description: "",
      price: 0,
      image: "",
      quantity: 0,
      offer: 0,
      images: [],
      customer_price: 0,
      original_price: 0,
      category: {
        name: "",
      },
      createdAt: "",
      updatedAt: "",
    },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload as any;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(addNewProduct.fulfilled, (state: any, action) => {
        state.data = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state: any, action: any) => {
        state.data = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default productDetailsSlice.reducer;
