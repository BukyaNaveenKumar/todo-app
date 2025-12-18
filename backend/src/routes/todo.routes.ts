import { Router } from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo
} from "../controllers/todo.controller";

const router = Router();

router.get("/", getTodos);
import multer from "multer";

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("photo"), createTodo);

router.put("/:id", updateTodo);
router.patch("/:id/toggle", toggleTodo);
router.delete("/:id", deleteTodo);

export default router;
