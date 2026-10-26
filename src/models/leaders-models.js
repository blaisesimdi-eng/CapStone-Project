const { string } = require("joi");

const mongoose = require("mongoose");
const { Schema } = mongoose;
const LeadersSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    IsActive: Boolean,
  },
  {
    timestamps: true,
  },
);
const leaders = mongoose.model("leaders", LeadersSchema);
module.exports = leaders;
