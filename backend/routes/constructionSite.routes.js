const express = require("express");
const router = express.Router();
const constructionSiteController = require("../controllers/constructionSite.controller");
const { protect, isAdmin } = require("../middlewares/auth.middleware");

router.post("/", constructionSiteController.createConstructionSite);
router.get("/", constructionSiteController.getAllConstructionSites);
router.get("/:id", constructionSiteController.getConstructionSiteById);
router.put("/:id", constructionSiteController.updateConstructionSite);
router.delete("/:id", constructionSiteController.deleteConstructionSite);

router.post("/assign", protect, isAdmin, constructionSiteController.assignConstructionSite);

module.exports = router;
