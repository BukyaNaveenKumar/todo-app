import { Request, Response } from "express";
import { categories, Category } from "../models/category.model";

let categoryId = 1;

export const getCategories = (_req: Request, res: Response) => {
  res.json(categories);
};

export const createCategory = (req: Request, res: Response) => {
  const { name } = req.body;

  const newCategory: Category = {
    id: categoryId++,
    name,
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
};
