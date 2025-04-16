// const mongoose = require('mongoose');
// const XLSX = require('xlsx');
// const fs = require('fs');

// // // Define School Schema
// // const schoolSchema = new mongoose.Schema({
// //     schoolCode: Number,
// //     schoolName: String,
// //     schoolMobNo: String,
// //     schoolEmail: String,
// //     area: String,
// //     city: String,
// //     zone: String,
// //     state: String,
// //     country: String,
// //     principalName: String,
// //     principalMobNo: String,
// //     principalDob: String,
// //     examCenterLevel1: String,
// //     examCenterLandmarkLevel1: String,
// //     examCenterLevel2: String,
// //     examCenterLandmarkLevel2: String,
// //     showAmountPaid: Number,
// //     showPerformance: Number,
// //     allowFreeDownload: String
// // });

// const schoolSchema = new mongoose.Schema({
//     schoolCode: Number,
//     schoolName: String,
//     schoolMobNo: String,
//     schoolEmail: String,
//     incharge: String,
//     fax: String,
//     area: String,
//     city: String,
//     country: String,
//     principalName: String,
//     principalMobNo: String,
//     principalDob: String,
//     remark: String,
//   });

// const School = mongoose.model('School', schoolSchema, "epoch-sample-data");

// // Function to convert XLSX to MongoDB
// async function convertXlsxToMongo(filePath) {
//     try {
//         // Read the Excel file
//         const workbook = XLSX.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];

//         // Convert sheet to JSON
//         const schools = XLSX.utils.sheet_to_json(worksheet, {
//             header: [
//                 'schoolCode',
//                 'schoolName',
//                 'schoolMobNo',
//                 'schoolEmail',
//                 'fax',
//                 'area',
//                 'city',
//                 'incharge',
//                 'country',
//                 'principalName',
//                 'principalMobNo',
//                 'principalDob',
//                 'remark'
//             ],
//             range: 1 // Skip header row
//         });

//         // Process the data to handle empty values and data types
//         const processedSchools = schools.map(school => ({
//             schoolCode: school.schoolCode ? parseInt(school.schoolCode) : null,
//             schoolName: school.schoolName || '',
//             schoolMobNo: school.schoolMobNo || '',
//             schoolEmail: school.schoolEmail || '',
//             fax: school.fax || '',
//             area: school.area || '',
//             city: school.city || '',
//             incharge: school.incharge || '',
//             country: school.country || '',
//             principalName: school.principalName || '',
//             principalMobNo: school.principalMobNo || '',
//             principalDob: school.principalDob || '',
//             remark: school.remark || ''
//         }));

//         // Clear existing data (optional)
//         await School.deleteMany({});

//         // Insert new data
//         await School.insertMany(processedSchools);
//         console.log(`Successfully inserted ${processedSchools.length} schools into MongoDB`);

//         // Close connection
//         mongoose.connection.close();

//     } catch (error) {
//         console.error('Error processing XLSX file:', error);
//         mongoose.connection.close();
//     }
// }

// // Path to your XLSX file
// const filePath = './School-Master-Final-CSV.csv';

// // convertXlsxToMongo(filePath);

// module.exports = { convertXlsxToMongo, School };

const mongoose = require("mongoose");
const XLSX = require("xlsx");

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const schoolSchema = new mongoose.Schema({
  schoolCode: Number,
  schoolName: String,
  schoolEmail: String,
  fax: String,
  area: String,
  city: String,
  country: String,
  incharge: String,
  inchargeDob: String,
  schoolMobNo: String,
  principalName: String,
  principalDob: String,
  principalMobNo: String,
  remark: String,
});

const existingModel = "schools-data";

const School =
  mongoose.models.existingModel || mongoose.model("schools-data", schoolSchema);

// Convert Excel to Mongo
async function convertXlsxToMongo(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const schools = jsonData.map((row) => ({
      schoolCode: row["School Code"] ? parseInt(row["School Code"]) : null,
      schoolName: row["School Name"] || "",
      schoolEmail: row["Email Id"] || "",
      fax: row["FAX"] || "",
      area: row["Area"] || "",
      city: row["City"] || "",
      country: row["Country"] || "",
      incharge: row["Incharge"] || "",
      schoolMobNo: row["Mob No."] || "",
      principalName: row["Principal Name"] || "",
      principalDob: row["DOB_1"] || row["DOB"] || "", // fallback
      principalMobNo: row["Mob No._1"] || "",
      remark: row["Remark"] || "",
    }));

    // Clear old data and insert new
    await School.deleteMany({});
    await School.insertMany(schools);

    console.log(`✅ Inserted ${schools.length} school records successfully.`);
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting school data:", err);
    mongoose.connection.close();
  }
}

// // Run the function
// const filePath = './School-Master-Final.xlsx';
// convertXlsxToMongo(filePath);

module.exports = { convertXlsxToMongo, School };
