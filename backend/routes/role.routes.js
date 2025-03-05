const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");
const { protect, isAdmin } = require("../middlewares/auth.middleware");

// 🚀 Mettre à jour le rôle d'un utilisateur (seul un Responsable peut le faire)
router.put("/update-role", protect, isAdmin, roleController.updateUserRole);

module.exports = router;