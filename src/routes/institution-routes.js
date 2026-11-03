const express = require("express");
const {
  getInstitutes,
  getOneInstitute,
  updateInstitute,
  replaceInstitute,
} = require("../controller/institution-controller");
const addInstitute = require("../controller/institutes/add-institute");
const authtenticate = require("../middleware/authtenticate");
const checkId = require("../middleware/validate.param");
const institute = require("../models/institution-models");
const deleteInstitute = require("../controller/institutes/delete-institute");
const authorizeRole = require("../middleware/role-acess");
const reviews = require("../controller/review-institute");
const router = express.Router();
router.get(
  "/institution",
  authtenticate,
  authorizeRole("admin", "manager", "users"),
  getInstitutes,
);
router.get(
  "/institution/:id",
  checkId,
  authtenticate,
  authorizeRole("admin", "manager", "users"),

  getOneInstitute,
);
router.post(
  "/addinstitution",
  authtenticate,
  authorizeRole("admin"),
  addInstitute,
);
router.patch(
  "/replaceinstitution/:id",
  checkId,
  authtenticate,
  authorizeRole("admin", "manager"),
  replaceInstitute,
);
router.put(
  "/updateinstitution/:id",
  checkId,
  authtenticate,
  authorizeRole("admin", "manager", "users"),

  updateInstitute,
);
router.delete(
  "/deleteinstitute",
  checkId,
  authtenticate,
  authorizeRole("admin"),
  deleteInstitute,
);
router.post(
  "/institution/:id/reviews",
  authtenticate,
  authorizeRole("admin", "manager", "users"),
  reviews,
);
module.exports = router;
