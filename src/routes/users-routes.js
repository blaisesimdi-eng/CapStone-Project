const express = require("express");
const authtenticate = require("../middleware/authtenticate");
const authorizeRole = require("../middleware/role-acess");

const router = express.Router();
//Only admin route
router.get("/admin", authtenticate, authorizeRole("admin"), (req, res) => {
  return res.json({
    message: "Welcome Admin",
  });
});
//Only manager route
router.get(
  "/manager",
  authtenticate,
  authorizeRole("manager", "admin"),
  (req, res) => {
    return res.json({
      message: "Welcome Manager",
    });
  },
);
//All users route
router.get(
  "/users",
  authtenticate,
  authorizeRole("users", "admin", "manager"),
  (req, res) => {
    return res.json({
      message: "Welcome  users",
    });
  },
);

module.exports = router;
