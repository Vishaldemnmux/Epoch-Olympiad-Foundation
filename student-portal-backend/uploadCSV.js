const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({}, { strict: false });
const Student = mongoose.model("Student", studentSchema, "student-data");


const processCSV = async (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                try {
                    await Student.insertMany(results);
                    // fs.unlinkSync(filePath); // Delete file after processing
                    resolve({ message: "CSV data uploaded successfully", count: results.length });
                } catch (error) {
                    reject(error);
                }
            })
            .on("error", (error) => reject(error));
    });
};

module.exports = processCSV;
