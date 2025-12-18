import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCategories } from "../features/categories/categorySlice";

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((s) => s.categories.items);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <ul>
      {categories.map((cat: any) => (
        <li key={cat.id}>{cat.name}</li>
      ))}
    </ul>
  );
};

export default CategoryList;
