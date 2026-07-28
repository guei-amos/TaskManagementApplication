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

// Routes API Backend
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// --- CONFIGURATION DÉPLOIEMENT FRONTEND ---

// Reconstitution de __dirname pour la syntaxe "import" (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin vers le dossier build (ou dist) généré par React
const frontendBuildPath = path.join(__dirname, "../frontend/build");

// Servir les fichiers statiques HTML/CSS/JS de React
app.use(express.static(frontendBuildPath));

// Rediriger toutes les autres requêtes (hors API) vers l'index.html de React

app.get('/*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Le serveur a démarré sur le port ${PORT}`);
});