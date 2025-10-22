const { Router } = require("express");
const upload = require("../libs/cloudinaryConfig");
const checkAuthentication = require("../middleware/auth");
const { handleCreateTour, handleGetAllTours, handleGetTour } = require("../controller/tour-controller");
const router = Router();

router.post("/", upload.array("images", 10), handleCreateTour)

router.get("/", checkAuthentication, handleGetAllTours);

router.get("/:id", checkAuthentication, handleGetTour)

module.exports = router;