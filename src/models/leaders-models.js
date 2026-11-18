const mongoose = require("mongoose");
const { Schema } = mongoose;
const LeadersSchema = new Schema(
  {
    headName: { type: String },
    headTitle: { type: String },
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
