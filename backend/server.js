
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const initDB = require("./config/sequelize");
const routes = require("./routes");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// Initialiser l'application Express
const app = express();

// Middleware de sécurité et logs
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialiser la base de données
initDB();

app.use(express.json());
app.use("/api", routes);
// Route par défaut
app.get("/", (req, res) => {
  res.send(" API en ligne avec Sequelize et MySQL !");
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});
