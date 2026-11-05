const { string, required } = require("joi");

const mongoose = require("mongoose");
const { Schema } = mongoose;
const LeadersSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    contactPhone: { type: String },
    IsActive: { type: Boolean, required: true },
    contactEmail: { type: String, required: true },
    role: { type: String, required: true },
    passWord: { type: String, required: true },
    role: {
      type: String,
      enum: ["manager", "admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
LeadersSchema.virtual("institute", {
  ref: "institute",
  localField: "_id",
  foreignField: "leaderId",
});
const leaders = mongoose.model("leaders", LeadersSchema);
module.exports = leaders;
