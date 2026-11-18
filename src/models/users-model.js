const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },

    contactEmail: { type: String, required: true, unique: true },
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

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
