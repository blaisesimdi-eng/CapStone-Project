const express = require("express");
const authtenticate = require("../middleware/authtenticate");
const authorizeRole = require("../middleware/role-acess");
const { location, getLocation } = require("../controller/location-controller");
const checkId = require("../middleware/validate.param");

const router = express.Router();
router.post(
  "/addlocation",
  checkId,
  authtenticate,
  authorizeRole("admin"),
  location,
);
router.get("/location/:id", checkId, authtenticate, authorizeRole, getLocation);
router.get(
  "/location",
  authtenticate,
  authorizeRole("admin", "manager", "user"),
  getLocation,
);
module.exports = router;
