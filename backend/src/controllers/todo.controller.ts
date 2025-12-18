import { Request, Response } from "express";
import { todos, Todo } from "../models/todo.model";

let todoId = 1;

// GET ALL TODOS
export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
};

// CREATE TODO
export const createTodo = (req: Request, res: Response) => {
  const { title, description, dueDate, categoryId } = req.body;

  const newTodo = {
    id: Date.now(),
    title,
    description,
    dueDate,
    categoryId,
    completed: false,
    createdAt: new Date().toISOString(),
    photoName: req.file ? req.file.originalname : null,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};


// UPDATE TODO
export const updateTodo = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  const { title, description, dueDate, categoryId } = req.body;

  todo.title = title ?? todo.title;
  todo.description = description ?? todo.description;
  todo.dueDate = dueDate ?? todo.dueDate;
  todo.categoryId = categoryId ?? todo.categoryId;

  return res.json(todo);
};

// TOGGLE COMPLETE
export const toggleTodo = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.completed = !todo.completed;
  return res.json(todo);
};

// DELETE TODO
export const deleteTodo = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos.splice(index, 1);
  return res.json({ message: "Todo deleted", id });
};
