// reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  addNewProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "./actions";

const productsSlice = createSlice({
  name: "products",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload as any;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(addNewProduct.fulfilled, (state: any, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state: any, action: any) => {
        const index = state.data.findIndex(
          (product: any) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (product: any) => product.id !== action.payload
        );
      });
  },
});

export default productsSlice.reducer;
