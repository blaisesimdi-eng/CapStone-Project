const express = require("express");
const addLeaders = require("../controller/add-leaders");
const getLeader = require("../controller/get-leaders");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    message: "Welcome to leaders route",
  });
});
router.post("/addleader", addLeaders);
router.get("/getLeader/:id", getLeader);
module.exports = router;
