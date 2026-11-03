const { string, required } = require("joi");

const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewSchema = new Schema(
  {
    ratings: { type: Number },
    comment: { type: String },

    userId: {
      type: mongoose.ObjectId,
      ref: "Users",
    },
    instituteId: {
      type: mongoose.ObjectId,
      ref: "institute",
    },
  },
  {
    timestamps: true,
    collection: "reviews",
  },
);

const review = mongoose.model("review", reviewSchema);
module.exports = review;
