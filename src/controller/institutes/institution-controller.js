const mongoose = require("mongoose");
const { Types } = require("mongoose");
const institutions = require("../../models/institution-models");

const paginationMeta = ({ page, limit, total }) => {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    totalItems: total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};
const getInstitutes = async (req, res) => {
  const { skip, limit, page } = req.paginate;
  const { authorId, role } = req;
  const id = req.params.id;

  let uni;
  let filter = {};
  //let filter = role === "admin" ? {} : { authorId };

  if (req.query.search) {
    const search = {
      $regex: String(req.query.search),
      $options: "i",
    };
    filter.$or = [
      { institutionName: search },
      { institutionType: search },
      { owner: search },
    ];
  }

  const [results, total] = await Promise.all([
    institutions
      .find(filter)
      .populate({
        path: "location",
        select: "state city lga address",
      })
      .populate("review")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec(),
    institutions.countDocuments(filter),
  ]);
  console.log("This is your uni");

  return res.status(200).json({
    status: res.statusCode,
    meta: paginationMeta({ page, limit, total }),
    data: results,
  });
};

const getOneInstitute = async (req, res) => {
  const id = req.params.id;
  const institute = await institutions
    .findOne({
      _id: new Types.ObjectId(id),
    })
    .populate([
      {
        path: "leaderId",
        select: "firstName lastName",
      },
      {
        path: "location",
        select: "state city lga address",
      },
    ])
    .lean();
  //const validLeader = await institutions.findById(id);
  if (!institute) {
    return res.status(400).json({
      message: "Not a valid Id, you are not authorized to acess this route",
      status: res.statusCode,
      data: null,
    });
  }
  return res.status(200).json({
    status: res.statusCode,
    message: "This is your Institute",
    data: institute,
  });
};

const updateInstitute = async (req, res) => {
  const authorId = new Types.ObjectId(req.params.id);
  const id = req.params.id;
  const {
    institutionName,
    institutionType,
    owner,
    programs,
    yearEstabilished,
  } = req.body;
  console.log("Institution updated");
  delete req.body._id;
  const validAuthor = await institutions.findById(req.authorId).lean();

  if (!validAuthor) {
    return res.status(403).json({
      status: res.statusCode,
      message: "Sorry you are not authorized on this route.",
      data: null,
    });
  }
  const instituteExists = await institutions.findOne({ _id: id, authorId });
  if (!instituteExists) {
    return res.status(404).json({
      status: res.statusCode,
      message: "Institition not found",
      data: null,
    });
  }
  const payload = {
    institutionName: institutionName || instituteExists.institutionName,
    institutionType: institutionType || instituteExists.institutionType,
    owner: owner || instituteExists.owner,
    programs: programs || instituteExists.programs,
    yearEstabilished: yearEstabilished || instituteExists.yearEstabilished,
  };
  const institute = await institutions.findByIdAndUpdate(id, payload, {
    runValidators: true,
    returnDocument: "after",
  });

  return res.status(200).json({
    status: res.statusCode,
    message: "Institution update sucessful",
    data: institute,
  });
};

const replaceInstitute = async (req, res) => {
  const id = req.params.id;
  const { owner, programs, contactEmail, contactPhone } = req.body;
  console.log("Replaced done sucessfully");
  const uni = await institutions.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    returnDocument: "after",
  });
  if (!uni) {
    return res.status(404).json({
      status: res.statusCode,
      message: "Institution not found",
      data: null,
    });
  }

  return res.status(200).json({
    status: res.statusCode,
    message: " Replace done sucessfully",
    data: uni,
  });
};

module.exports = {
  getInstitutes,
  getOneInstitute,
  replaceInstitute,
  updateInstitute,
};
