const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    schoolCode: { type: String, required: true },
    schoolName: { type: String, required: true },
    emailId: { type: String, required: true },
    fax: { type: String },
    area: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
    incharge: { type: String, required: true },
    dob: { type: String }, // Storing as String for simplicity, can use Date type
    mobNo: { type: mongoose.Schema.Types.Mixed }, // Object or String
    principalName: { type: String, required: true },
    remark: { type: String },
  }, { timestamps: true });


module.exports = mongoose.models.School || mongoose.model("School", schoolSchema, "epoch-sample-datas");
