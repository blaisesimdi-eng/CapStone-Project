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
const paginate = require("../middleware/paginate");
const router = express.Router();
router.get(
  "/institution",
  authtenticate,
  authorizeRole("admin", "manager", "user"),
  paginate,
  getInstitutes,
);
router.get(
  "/institution/:id",
  checkId,
  authtenticate,
  authorizeRole("admin", "manager", "user"),

  getOneInstitute,
);
router.post(
  "/addinstitution",
  authtenticate,
  authorizeRole("admin"),
  addInstitute,
);
router.post(
  "/reviewinstitution/:id",
  authtenticate,
  authorizeRole("admin", "manager", "user"),
  reviews,
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
  authorizeRole("admin", "manager"),

  updateInstitute,
);
router.delete(
  "/deleteinstitute",
  checkId,
  authtenticate,
  authorizeRole("admin"),
  deleteInstitute,
);
module.exports = router;
