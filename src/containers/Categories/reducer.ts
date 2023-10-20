// reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
} from "./actions"; // path to your actions file

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    // ... any other synchronous reducers ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload as any;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })
      .addCase(addNewCategory.fulfilled, (state: any, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state: any, action: any) => {
        const index = state.data.findIndex(
          (category: any) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (category: any) => category.id !== action.payload
        );
      });
  },
});

export default categoriesSlice.reducer;
