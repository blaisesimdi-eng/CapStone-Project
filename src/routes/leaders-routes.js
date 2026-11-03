const express = require("express");
const {
  registerLeaders,
  loginLeaders,
} = require("../controller/leaders/register-leaders");
const getLeader = require("../controller/leaders/get-leaders");
const authorizeRole = require("../middleware/role-acess");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    message: "Welcome to leaders route",
  });
});
router.post("/register", authorizeRole("admin"), registerLeaders);
router.post("/login", loginLeaders);
router.get(
  "/getLeader/:id",
  authorizeRole("admin", "manager", "user"),
  getLeader,
);
module.exports = router;
