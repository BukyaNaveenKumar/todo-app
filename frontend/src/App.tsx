import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { fetchTodos } from "./features/todos/todoSlice";

import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import AddCategoryForm from "./components/AddCategoryForm";


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
  <div style={{ padding: 40 }}>
    <h1>Todo App</h1>

    {/* Category creation */}
    <AddCategoryForm />

    {/* Todo creation */}
    <AddTodoForm />

    {/* Todo list */}
    <TodoList />
  </div>
);

}

export default App;
