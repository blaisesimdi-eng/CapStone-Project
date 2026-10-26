const mongoose = require("mongoose");
async function connectDb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Institutions");
    console.log("Database is connected sucessfully");
  } catch (error) {
    console.log("Failed to connect database", error);
  }
}

module.exports = connectDb;
