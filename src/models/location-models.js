const { string, required } = require("joi");

const mongoose = require("mongoose");
const { Schema } = mongoose;
const locationSchema = new Schema(
  {
    state: { type: String },
    lga: { type: String },
    city: { type: String },
    address: { type: String },

    instituteId: {
      type: mongoose.ObjectId,
      ref: "institute",
    },
  },
  {
    timestamps: true,
    bufferCommands: false,
  },
);

const location = mongoose.model("location", locationSchema);
module.exports = location;
