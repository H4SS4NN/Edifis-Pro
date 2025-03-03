const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller"); 
const {protect, isAdmin} = require("../middlewares/auth.middleware"); 


router.post("/register",protect, isAdmin, userController.createUser); // Vérifier que `createUser` est bien défini
router.post("/login", userController.login); // Vérifier que `login` est bien défini

// Routes protégées



router.get("/", protect, userController.getAllUsers);
router.get("/:id", protect, userController.getUserById);
router.put("/:id", protect, userController.updateUser);
router.delete("/:id", protect, userController.deleteUser);

module.exports = router;
