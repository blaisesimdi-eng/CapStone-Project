const joi = require("joi");
const mongoose = require("mongoose");
const review = require("../models/review-models");

const reviewData = (payload) => {
  const schema = joi.object({
    ratings: joi.number().max(5).required(),
    comment: joi.string(),
  });
  const { error, value } = schema.validate(payload);
  return { error, value };
};
const reviews = async (req, res) => {
  const userId = req.authorId;
  const id = req.params.id;
  const { error, value } = reviewData(req.body);
  if (error) {
    console.log(error);
    return res.status(404).json({
      status: res.statusCode,
      error: error.details[0].message,
      data: null,
    });
  }

  const { ratings, comment } = req.body;
  if (!ratings) {
    return res.status(400).json({
      message: "Input correct rating",
    });
  }
  const newReview = new review({
    ...value,
    userId,
    instituteId: id,
  });
  await newReview.save();

  return res.status(201).json({
    status: res.statusCode,
    message: "Review added succesfully",
    data: newReview,
  });
};

module.exports = reviews;
