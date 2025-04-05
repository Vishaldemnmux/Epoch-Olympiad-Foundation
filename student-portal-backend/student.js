const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  "Roll No": {
    type: Object,
    required: true
  },
  Duplicates: {
    type: String,
    required: true
  },
  "School Code": {
    type: String,
    required: true
  },
  Class: {
    type: String,
    required: true
  },
  Section: {
    type: String,
    required: true
  },
  "Student Name": {
    type: String,
    required: true
  },
  "Father Name": {
    type: String,
    required: true
  },
  "Mother Name": {
    type: String,
    required: true
  },
  DOB: {
    type: String,
    required: true
  },
  "Mob No": {
    type: Object,
    required: true
  },
  IAOL1: {
    type: String,
    required: true
  },
  "IAOL1 Book": {
    type: String,
    required: true
  },
  ITSTL1: {
    type: String,
    required: true
  },
  "ITSTL1 Book": {
    type: String,
    required: true
  },
  IMOL1: {
    type: String,
    required: true
  },
  "IMOL1 Book": {
    type: String,
    required: true
  },
  IENGOL1: {
    type: String,
    required: true
  },
  "IENGOL1 Book": {
    type: String,
    required: true
  },
  IGKOL1: {
    type: String,
    required: true
  },
  "IGKOL1 Book": {
    type: String,
    required: true
  },
  "Total Basic Level Participated Exams": {
    type: String,
    required: true
  },
  "Basic Level Full Amount": {
    type: String,
    required: true
  },
  "Basic Level Paid Amount": {
    type: String,
    required: true
  },
  "Basic Level Amount Paid Online": {
    type: String,
    required: true
  }
}, { collection: "student-data" });


 const Student = mongoose.models.Student || mongoose.model("Student", studentSchema, "student-data");

 module.exports = Student ;