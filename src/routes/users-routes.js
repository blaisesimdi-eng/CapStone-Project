const express = require("express");
const authtenticate = require("../middleware/authtenticate");
const authorizeRole = require("../middleware/role-acess");
const {
  registerUser,
  loginUser,
} = require("../controller/users/register-users");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
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
  authorizeRole("user", "admin", "manager"),
  (req, res) => {
    return res.json({
      message: "Welcome  users",
    });
  },
);
//router.get("/getUser/:id", authtenticate, getLeader);

module.exports = router;
