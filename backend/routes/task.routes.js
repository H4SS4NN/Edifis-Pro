const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { protect, isAdmin } = require("../middlewares/auth.middleware");

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.post("/assign", protect, isAdmin, taskController.assignTask);


module.exports = router;
