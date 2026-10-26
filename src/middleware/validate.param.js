const mongoose = require("mongoose");
function checkId(req, res, next) {
  const id = mongoose.isValidObjectId(req.params.id);
  if (!id) {
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
