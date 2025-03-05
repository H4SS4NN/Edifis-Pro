const express = require("express");
const router = express.Router();
const timesheetController = require("../controllers/timesheet.controller");
const { protect, isAdmin } = require("../middlewares/auth.middleware");

router.post("/", timesheetController.createTimesheet);
router.get("/", timesheetController.getAllTimesheets);
router.get("/:id", timesheetController.getTimesheetById);
router.put("/:id", timesheetController.updateTimesheet);
router.delete("/:id", timesheetController.deleteTimesheet);

router.post("/clock-in", protect, timesheetController.clockIn);
router.post("/clock-out", protect, timesheetController.clockOut);

module.exports = router;
