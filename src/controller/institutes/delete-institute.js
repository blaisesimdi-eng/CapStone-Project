const mongoose = require("mongoose");
const institutions = require("../../models/institution-models");

const deleteInstitute = async (req, res) => {
  const id = req.params.id;
  const deleteInst = await institutions.findByIdAndDelete(id);
  if (!deleteInst) {
    return res.status(404).json({
      status: res.statusCode,
      message: "Institute not found",
      data: null,
    });
  }
  return res.status(200).json({
    status: res.statusCode,
    message: "Institute deleted",
    data: deleteInst,
  });
};
module.exports = deleteInstitute;
