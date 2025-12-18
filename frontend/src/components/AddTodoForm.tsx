import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCategories } from "../features/categories/categorySlice";
import { createTodo } from "../features/todos/todoSlice";


const AddTodoForm = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((s) => s.categories.items);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    categoryId: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    dispatch(createTodo(form));
    setForm({ title: "", description: "", dueDate: "", categoryId: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        name="title"
        placeholder="Todo title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
      >
        <option value="">Select category</option>
        {categories.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
