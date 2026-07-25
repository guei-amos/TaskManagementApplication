import express from "express";
import { getTasks, createTask,updateTask, deleteTask } from "../controllers/taskController.js";
import protect from "../middleware/Express.js";



const taskRoutes = express.Router();

taskRoutes.get("/", protect, getTasks);

taskRoutes.post("/", protect, createTask);

taskRoutes.put("/:id", protect, updateTask);

taskRoutes.delete("/:id",  protect, deleteTask);

export default taskRoutes;