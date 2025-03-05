const express = require("express");
const router = express.Router();
const constructionSiteController = require("../controllers/constructionSite.controller");
const { protect, isAdmin } = require("../middlewares/auth.middleware");

router.post("/", protect, isAdmin, constructionSiteController.createConstructionSite);
router.get("/",protect, isAdmin, constructionSiteController.getAllConstructionSites);
router.get("/:id", constructionSiteController.getConstructionSiteById);
router.put("/:id", constructionSiteController.updateConstructionSite);
router.delete("/:id", constructionSiteController.deleteConstructionSite);
router.get("/user/:userId", protect, constructionSiteController.getConstructionSitesByUserId);


router.post("/assign", protect, isAdmin, constructionSiteController.assignConstructionSite);

module.exports = router;
