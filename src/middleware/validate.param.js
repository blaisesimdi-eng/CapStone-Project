const mongoose = require("mongoose");
function checkId(req, res, next) {
  const id = req.params.id;
  const isValidId = mongoose.isValidObjectId(id);
  if (!isValidId) {
    return res.status(400).json({
      params: id,
      status: res.statusCode,
      message: "Sorry id not a Valid Object id!",
      data: null,
    });
  }
  console.log("I got called");
  next();
}

module.exports = checkId;
