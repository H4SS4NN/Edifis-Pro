import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Route principale renvoyant un message JSON
app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from server.js!" });
});

// Démarrer le serveur si NODE_ENV n'est pas 'test'
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
