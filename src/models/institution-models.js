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
  },
);
const institute = mongoose.model("institute", instituteSchema);
module.exports = institute;
