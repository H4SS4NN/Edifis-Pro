const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect, isAdmin } = require("../middlewares/auth.middleware");
const { upload, setUploadType } = require("../middlewares/upload.middleware");



router.post("/register", protect, isAdmin, userController.createUser);
router.post("/login", userController.login);

// Routes protégées

router.post("/upload-profile", protect, setUploadType("profile"), upload.single("image"), userController.updateProfilePicture);

router.get("/all/manager", protect, isAdmin, userController.getAllManagers);
router.get("/all", protect, isAdmin, userController.getAllUsers);
router.get("/:id", protect, isAdmin, userController.getUserById);
router.put("/:id", protect, userController.updateUser);
router.delete("/:id", protect, userController.deleteUser);

module.exports = router;
