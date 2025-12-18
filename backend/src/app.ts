import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";
import categoryRoutes from "./routes/category.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/categories", categoryRoutes);

export default app;
