import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5001/api/todos";

// FETCH ALL TODOS
export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// CREATE TODO
export const createTodo = createAsyncThunk(
  "todos/create",
  async (todo: any) => {
    const res = await axios.post(API_URL, todo);
    return res.data;
  }
);

// UPDATE TODO
export const updateTodo = createAsyncThunk(
  "todos/update",
  async ({ id, data }: any) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  }
);

// TOGGLE COMPLETE
export const toggleTodo = createAsyncThunk(
  "todos/toggle",
  async (id: number) => {
    const res = await axios.patch(`${API_URL}/${id}/toggle`);
    return res.data;
  }
);

// DELETE TODO
export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

interface TodoState {
  items: any[];
  loading: boolean;
  filter: "all" | "active" | "completed";
  sort: "created" | "due";
}

const initialState: TodoState = {
  items: [],
  loading: false,
  filter: "all",
  sort: "created",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const idx = state.items.findIndex(t => t.id === action.payload.id);
      state.items[idx] = action.payload;
    });
    builder.addCase(toggleTodo.fulfilled, (state, action) => {
      const idx = state.items.findIndex(t => t.id === action.payload.id);
      state.items[idx] = action.payload;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    });
  },
});

export const { setFilter, setSort } = todoSlice.actions;

export default todoSlice.reducer;
