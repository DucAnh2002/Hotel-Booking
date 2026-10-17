const express = require("express");
const router = express.Router();
const amenityController = require("../controllers/amenityController");
const { checkRole } = require("../middlewares/checkRole");

router.get("/", amenityController.getAllAmenities);
router.post(
  "/",
  checkRole("admin", "manager"),
  amenityController.createAmenity,
);

module.exports = router;
