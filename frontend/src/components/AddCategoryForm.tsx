import { useState } from "react";
import type { FormEvent } from "react";
import { useAppDispatch } from "../app/hooks";
import { createCategory } from "../features/categories/categorySlice";

const AddCategoryForm = () => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch(createCategory({ name }));
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="New category"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategoryForm;
