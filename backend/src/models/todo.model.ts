export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  categoryId: number;
  completed: boolean;
  createdAt: string;
}

export const todos: Todo[] = [];
