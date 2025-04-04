const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  "School Code": { type: String, required: true },
  "School Name": { type: String, required: true },
  "Email Id": { type: String, required: true },
  "FAX": { type: String },
  "Area": { type: String },
  "City": { type: String, required: true },
  "Country": { type: String, required: true },
  "Incharge": { type: String, required: true },
  "DOB": { type: String, required: true },
  "Mob No": { 
      type: Object, 
      required: true 
  },
  "Principal Name": { type: String, required: true },
  "Remark": { type: String, default: "NONE" }
}, { timestamps: true });


module.exports = mongoose.models.School || mongoose.model("School", schoolSchema, "epoch-sample-data");
