const leaders = require("../models/leaders-models");

const getLeader = async (req, res) => {
  const id = req.params.id;
  let uni = await leaders.findById(id).sort().lean().exec();
  console.log("This are your uni");

  if (!uni) {
    return res.status(404).json({
      status: res.statusCode,
      message: "Leader not found",
      data: null,
    });
  }

  return res.status(200).json({
    status: res.statusCode,
    data: uni,
  });
};
module.exports = getLeader;
