// productDetailsSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

interface ProductDetailsState {
  data: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductDetailsState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id: number) => {
    const response = await api.getProductById(id);
    return response;
  }
);

export const addNewProduct = createAsyncThunk(
  "product/addNewProduct",
  async (product: any) => {
    const response = await api.createProduct(product);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product: any) => {
    const response = await api.updateProduct(product);
    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: number) => {
    const response = await api.deleteProduct(id);
    return response;
  }
);

const productDetailsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      });
  },
});

export default productDetailsSlice.reducer;
