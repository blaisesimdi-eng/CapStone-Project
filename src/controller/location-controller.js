const joi = require("joi");
const mongoose = require("mongoose");
const locations = require("../models/location-models");
const locationData = (payload) => {
  const schema = joi.object({
    state: joi.string().required(),
    lga: joi.string(),
    address: joi.string(),
  });
  const { error, value } = schema.validate(payload);
  return { error, value };
};
const location = async (req, res) => {
  const userId = req.authorId;
  const id = req.params.id;
  const { error, value } = locationData(req.body);
  if (error) {
    console.log(error);
    return res.status(404).json({
      status: res.statusCode,
      error: error.details[0].message,
      data: null,
    });
  }

  const { state, lga, address } = req.body;
  if (!state) {
    return res.status(400).json({
      message: "Input correct location",
    });
  }
  const newLocation = new locations({
    ...value,
    userId,
    instituteId: id,
  });
  await newLocation.save();

  return res.status(201).json({
    status: res.statusCode,
    message: "Location added succesfully",
    data: newLocation,
  });
};
const getLocation = async (req, res) => {
  const id = req.params.id;

  uni = await locations
    .find({})
    .populate({
      path: "instituteId",
      select: "institutionName institutionType",
    })
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  return res.status(200).json({
    status: res.statusCode,
    data: uni,
  });
};
console.log("This is your uni");
module.exports = { location, getLocation };
