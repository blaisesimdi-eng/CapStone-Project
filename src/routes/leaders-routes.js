const express = require("express");
const {
  registerLeaders,
  loginLeaders,
} = require("../controller/leaders/register-leaders");
const getLeader = require("../controller/leaders/get-leaders");
const authorizeRole = require("../middleware/role-acess");
const authtenticate = require("../middleware/authtenticate");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    message: "Welcome to leaders route",
  });
});
router.post(
  "/register",
  authtenticate,
  authorizeRole(["admin"]),
  registerLeaders,
);
router.post("/login", authtenticate, loginLeaders);
router.get("/getLeader/:id", authtenticate, authorizeRole("admin"), getLeader);
module.exports = router;
