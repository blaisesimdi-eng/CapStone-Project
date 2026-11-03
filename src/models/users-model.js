const { string, required } = require("joi");

const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    contactEmail: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    role: {
      type: String,
      default: "users",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
