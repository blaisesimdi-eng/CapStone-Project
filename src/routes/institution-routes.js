const express = require("express");
const {
  getInstitutes,
  getOneInstitute,
  updateInstitute,
  replaceInstitute,
} = require("../controller/institution-controller");
const addInstitute = require("../controller/add-institute");
const checkId = require("../middleware/validate.param");
const institute = require("../models/institution-models");
const router = express.Router();

router.get("/institution", getInstitutes);
router.get("/institution/:id", checkId, getOneInstitute);
router.post("/addinstitution", addInstitute);
router.patch("/replaceinstitution/:id", checkId, replaceInstitute);
router.put("/updateinstitution/:id", checkId, updateInstitute);

module.exports = router;
