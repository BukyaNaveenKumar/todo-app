import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:5001/api/categories";

export interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  items: Category[];
  loading: boolean;
  error?: string;
}

const initialState: CategoryState = {
  items: [],
  loading: false,
};

export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetch",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);

export const createCategory = createAsyncThunk<
  Category,
  { name: string }
>("categories/create", async (cat) => {
  const res = await axios.post(API_URL, cat);
  return res.data;
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch categories";
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.items.push(action.payload);
        }
      );
  },
});

export default categorySlice.reducer;
