const { string } = require("joi");

const mongoose = require("mongoose");
const { Schema } = mongoose;
const instituteSchema = new Schema(
  {
    institutionName: { type: String },
    institutionType: { type: String },
    owner: { type: String },
    programs: [{ type: String }],
    contactPhone: { type: String },
    contactEmail: { type: String },
    yearEstabilished: { type: Number },
    leaderId: {
      type: mongoose.ObjectId,
      ref: "leaders",
    },
  },
  {
    timestamps: true,
    collection: "institutes",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
instituteSchema.virtual("location", {
  ref: "location",
  localField: "_id",
  foreignField: "instituteId",
});
instituteSchema.virtual("review", {
  ref: "review",
  localField: "_id",
  foreignField: "instituteId",
});

const institute = mongoose.model("institute", instituteSchema);
module.exports = institute;
