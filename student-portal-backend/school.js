const mongoose = require("mongoose");

// Define School Schema
const schoolSchema = new mongoose.Schema({
  schoolCode: Number,
  schoolName: String,
  schoolMobNo: String,
  schoolEmail: String,
  area: String,
  city: String,
  zone: String,
  state: String,
  country: String,
  principalName: String,
  principalMobNo: String,
  principalDob: String,
  examCenterLevel1: String,
  examCenterLandmarkLevel1: String,
  examCenterLevel2: String,
  examCenterLandmarkLevel2: String,
  showAmountPaid: Number,
  showPerformance: Number,
  allowFreeDownload: String,
});

const School = mongoose.model("schools-data", schoolSchema);

// Function to convert XLSX to MongoDB

module.exports = { School };
