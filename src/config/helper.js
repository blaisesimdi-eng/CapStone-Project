const mongoose = require("mongoose");
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is connected sucessfully");
  } catch (error) {
    console.log("Failed to connect database", error);
  }
}

module.exports = connectDb;
