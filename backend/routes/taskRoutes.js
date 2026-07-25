import express from "express";
import { getTasks, createTask,updateTask, deleteTask } from "../controllers/taskController.js";




const taskRoutes = express.Router();

taskRoutes.get("/", getTasks);

taskRoutes.post("/", createTask);

taskRoutes.put("/:id", updateTask);

taskRoutes.delete("/:id",  deleteTask);

export default taskRoutes;