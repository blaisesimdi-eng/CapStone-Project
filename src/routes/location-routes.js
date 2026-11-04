const express = require("express");
const authtenticate = require("../middleware/authtenticate");
const authorizeRole = require("../middleware/role-acess");
const {
  addLocation,
  getLocation,
  getLocationById,
} = require("../controller/location-controller");
const checkId = require("../middleware/validate.param");

const router = express.Router();
router.post(
  "/addlocation",
  checkId,
  authtenticate,
  authorizeRole("admin"),
  addLocation,
);
router.get(
  "/location/:id",
  checkId,
  authtenticate,
  authorizeRole("admin", "manager", "user"),
  getLocationById,
);
router.get(
  "/location",
  authtenticate,
  authorizeRole("admin", "manager", "user"),
  getLocation,
);
module.exports = router;
