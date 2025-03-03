const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const initDB = require("./config/sequelize");

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();

// Middleware de sécurité et logs
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialiser la base de données
initDB();

// Route par défaut
app.get("/", (req, res) => {
  res.send("API en ligne !");
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
