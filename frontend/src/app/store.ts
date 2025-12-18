import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todoSlice";
import categoryReducer from "../features/categories/categorySlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
