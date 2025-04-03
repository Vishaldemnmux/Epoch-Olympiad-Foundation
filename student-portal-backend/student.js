const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    RollNo: {
      type: Object,
      required: true
    },
    Duplicates: {
      type: Boolean,
      default: false
    },
    "School Code": {
      type: Number,
      required: true
    },
    Class: {
      type: Number,
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
    "Mother Name": {
      type: String,
      required: true
    },
    "Father Name": {
      type: String,
      required: true
    },
    DOB: {
      type: String,
      required: true
    },
    "Mob No": {
        type: mongoose.Schema.Types.Mixed, 
      required: true
    },
    IAOL1: {
      type: Number,
      default: 0
    },
    "IAOL1 Book": {
      type: Number,
      default: 0
    },
    ITSTL1: {
      type: Number,
      default: 0
    },
    "ITSTL1 Book": {
      type: Number,
      default: 0
    },
    IMOL1: {
      type: Number,
      default: 0
    },
    "IMOL1 Book": {
      type: Number,
      default: 0
    },
    IGKOL1: {
      type: Number,
      default: 0
    },
    IGKOL1Book: {
      type: Number,
      default: 0
    },
    "Total Basic Level Participated Exams": {
      type: Number,
      required: true
    },
    "Basic Level Full Amount": {
      type: Number,
      required: true
    },
    "Basic Level Paid Amount": {
      type: Number,
      required: true
    },
    BookStatus: {
      type: String,
      required: true
    },
    IAOL2: {
      type: Number,
      default: 0
    },
    ITSTL2: {
      type: Number,
      default: 0
    },
    IMOL2: {
      type: Number,
      default: 0
    }
  },
  { collection: "student-data" });



 const Student = mongoose.models.Student || mongoose.model("Student", studentSchema, "student-data");

 console.log("Collection Name:", Student.collection.name);

 module.exports = Student ;