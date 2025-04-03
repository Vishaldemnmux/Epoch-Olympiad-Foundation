const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const schoolSchema = new mongoose.Schema({}, { strict: false });
const School = mongoose.model("epoch-sample-data", schoolSchema);


const uploadSchoolData = async (filePath) => {
    return new Promise((resolve, reject) => {
      const results = [];
      
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          try {
            await School.insertMany(results);
            fs.unlinkSync(filePath); 
            resolve({ message: "CSV data uploaded successfully" });
          } catch (error) {
            console.error("Error inserting data:", error);
            reject({ message: "Error uploading data" });
          }
        })
        .on("error", (error) => reject({ message: "Error reading file", error }));
    });
  };
  
  module.exports = uploadSchoolData;