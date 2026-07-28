import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 1. Routes API Backend
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// 2. Servir le Frontend React
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendBuildPath = path.join(__dirname, "../frontend/build");

// Fichiers statiques HTML, JS, CSS
app.use(express.static(frontendBuildPath));

// Redirection catch-all (Syntaxe RegExp sans guillemets obligatoire pour Express v5)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Le serveur a démarré sur le port ${PORT}`);
});