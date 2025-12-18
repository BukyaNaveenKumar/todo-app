import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  setSort,
} from "../features/todos/todoSlice";
import { fetchCategories } from "../features/categories/categorySlice";

/* ---------- TYPES ---------- */
interface Category {
  id: string;
  name: string;
}

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  categoryId: string;
  dueDate?: string;
  createdAt?: string;
}

/* ---------- COMPONENT ---------- */
const TodoList = () => {
  const dispatch = useAppDispatch();

  const { items, filter, sort } = useAppSelector((s) => s.todos);
  const categories = useAppSelector((s) => s.categories.items) as Category[];

  const todos = items as Todo[];

  /* ---------- LOCAL STATE ---------- */
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Todo>>({});

  /* ---------- EFFECT ---------- */
  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchCategories());
  }, [dispatch]);

  /* ---------- GROUP BY CATEGORY ---------- */
  const grouped = categories.map((cat) => ({
    category: cat.name,
    items: todos.filter((t) => t.categoryId === cat.id),
  }));

  /* ---------- FILTER ---------- */
  const applyFilter = (list: Todo[]) => {
    if (filter === "active") return list.filter((t) => !t.completed);
    if (filter === "completed") return list.filter((t) => t.completed);
    return list;
  };

  /* ---------- SORT ---------- */
  const applySorting = (list: Todo[]) => {
    if (sort === "due") {
      return [...list].sort((a, b) =>
        (a.dueDate || "").localeCompare(b.dueDate || "")
      );
    }
    return [...list].sort((a, b) =>
      (a.createdAt || "").localeCompare(b.createdAt || "")
    );
  };

  /* ---------- EDIT ---------- */
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditForm(todo);
  };

  const saveEdit = () => {
    if (editingId !== null) {
      dispatch(updateTodo({ id: editingId, data: editForm }));
      setEditingId(null);
      setEditForm({});
    }
  };

  /* ---------- RENDER ---------- */
  return (
    <div>
      {/* FILTER + SORT */}
      <div>
        <button onClick={() => dispatch(setFilter("all"))}>All</button>
        <button onClick={() => dispatch(setFilter("active"))}>Active</button>
        <button onClick={() => dispatch(setFilter("completed"))}>
          Completed
        </button>

        <select
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value as any))}
        >
          <option value="created">Sort by Created</option>
          <option value="due">Sort by Due Date</option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {todos.length === 0 && <p>No todos found</p>}

      {/* GROUPED TODOS */}
      {grouped.map(
        (group) =>
          group.items.length > 0 && (
            <div key={group.category} style={{ marginTop: 20 }}>
              <h3>{group.category}</h3>

              {applySorting(applyFilter(group.items)).map((todo) =>
                editingId === todo.id ? (
                  /* EDIT MODE */
                  <div key={todo.id}>
                    <input
                      value={editForm.title || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          title: e.target.value,
                        })
                      }
                    />
                    <input
                      value={editForm.description || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                    />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  /* VIEW MODE */
                  <div key={todo.id}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleTodo(todo.id))}
                    />

                    <span
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                        marginLeft: 8,
                      }}
                    >
                      {todo.title} – {todo.description}
                    </span>

                    <button onClick={() => startEdit(todo)}>Edit</button>
                    <button
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    >
                      Delete
                    </button>
                  </div>
                )
              )}
            </div>
          )
      )}
    </div>
  );
};

export default TodoList;
