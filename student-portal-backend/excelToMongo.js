// import XLSX from "xlsx";
// import { MongoClient } from "mongodb";

// // MongoDB connection details
// const uri = process.env.MONGO_URI;
// const dbName = process.env.DATABASE_NAME;
// const collectionName = "student_data_latests";

// // Fields to explicitly convert to strings
// const stringFields = ["rollNo", "schoolCode"];
// const renameFields = { class: "class" };

// // Function to check if a value is numeric (integer or float)
// const isNumeric = (value) => typeof value === "number" && !isNaN(value);

// // Function to convert Excel to MongoDB with type conversions
// async function excelToMongoDB(filePath) {
//   try {
//     // Read Excel file
//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[1]; // Sheet 2 (index 1)
//     const worksheet = workbook.Sheets[sheetName];

//     // Convert sheet to JSON
//     const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//     // Extract headers (first row) and rename if necessary
//     const headers = data[0].map((header) => renameFields[header] || header);

//     // Convert rows to documents with type conversions
//     const documents = data.slice(1).map((row) => {
//       const doc = {};
//       headers.forEach((header, index) => {
//         let value = row[index] !== undefined ? row[index] : null;

//         // Special handling for 'Duplicates' to convert to Boolean
//         if (header === "Duplicates") {
//           value = value === "1" || value === 1 || value === true;
//         }
//         // Convert numeric values to strings except for Duplicates
//         else if (isNumeric(value)) {
//           value = String(value);
//         }
//         // Explicitly convert specified fields to strings
//         if (stringFields.includes(header)) {
//           value = value !== null ? String(value) : null;
//         }
//         // Handle null or undefined as empty string
//         doc[header] = value !== null ? value : "";
//       });
//       return doc;
//     });

//     // Connect to MongoDB
//     const client = new MongoClient(uri);
//     await client.connect().then(() => {
//       console.log("Connected to MongoDB");
//     });
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Insert documents
//     const result = await collection.insertMany(documents);
//     console.log(`${result.insertedCount} documents inserted successfully`);

//     // Close connection
//     await client.close();
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// }

// // Execute the function
// excelToMongoDB("./copy.xlsx");

import XLSX from "xlsx";
import { MongoClient } from "mongodb";

// MongoDB connection details
const uri = process.env.MONGO_URI;
const dbName = process.env.DATABASE_NAME;
const collectionName = "student_data_latests";

// Fields to explicitly convert to strings
const stringFields = [
  "rollNo",
  "schoolCode",
  "mobNo",
  "IAOL1",
  "IAOL1Book",
  "ITSTL1",
  "ITSTL1Book",
  "IMOL1",
  "IMOL1Book",
  "IGKOL1",
  "IGKOL1Book",
  "IENGOL1",
  "IENGOL1Book",
  "totalBasicLevelParticipatedExams",
  "basicLevelFullAmount",
  "basicLevelAmountPaid",
  "basicLevelAmountPaidOnline",
  "advanceLevelAmountPaid",
  "advanceLevelAmountPaidOnline",
  "totalAmountPaid",
  "totalAmountPaidOnline",
];

// Mapping of Excel headers to MongoDB schema field names
const renameFields = {
  "Roll No.": "rollNo",
  Duplicates: "Duplicates",
  "School Code": "schoolCode",
  "Class ": "class",
  Section: "section",
  "Student Name ": "studentName",
  "Father Name": "fatherName",
  "Mother Name": "motherName",
  DOB: "dob",
  "Mob No.": "mobNo",
  IAOL1: "IAOL1",
  "IAOL1 Book": "IAOL1Book",
  ITSTL1: "ITSTL1",
  "ITSTL1 Book": "ITSTL1Book",
  IMOL1: "IMOL1",
  "IMOL1 Book": "IMOL1Book",
  IGKOL1: "IGKOL1",
  "IGKOL1 Book": "IGKOL1Book",
  IENGOL1: "IENGOL1",
  "IENGOL1 Book": "IENGOL1Book",
  "Total Basic Level Participated Exams": "totalBasicLevelParticipatedExams",
  "Basic Level Full Amount": "basicLevelFullAmount",
  "Basic Level Paid Amount": "basicLevelAmountPaid",
  "Basic Level Amount Paid Online": "basicLevelAmountPaidOnline",
  "Is Basic Level Concession Given": "isBasicLevelConcessionGiven",
  "Concession Reason": "concessionReason",
  "Parents Working School": "ParentsWorkingschool",
  Designation: "designation",
  City: "city",
  IAOL2: "IAOL2",
  ITSTL2: "ITSTL2",
  IMOL2: "IMOL2",
  IENGOL2: "IENGOL2",
  "Advance Level Paid Amount": "advanceLevelAmountPaid",
  "Advance Level Amount Paid Online": "advanceLevelAmountPaidOnline",
  "Total Amount Paid": "totalAmountPaid",
  "Total Amount Paid Online": "totalAmountPaidOnline",
};

// Function to check if a value is numeric
const isNumeric = (value) => typeof value === "number" && !isNaN(value);

// Main function to convert Excel to MongoDB
export async function excelToMongoDB(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Use first sheet (Sheet 1)
    const worksheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Map headers
    const headers = data[0].map((header) => renameFields[header] || header);

    // Convert rows to documents
    const documents = data.slice(1).map((row) => {
      const doc = {};
      headers.forEach((header, index) => {
        let value = row[index] !== undefined ? row[index] : null;

        if (header === "Duplicates") {
          value = value === "1" || value === 1 || value === true;
        } else if (stringFields.includes(header) && isNumeric(value)) {
          value = String(value);
        }

        doc[header] = value !== null ? value : "";
      });
      return doc;
    });

    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents inserted successfully`);

    await client.close();
  } catch (error) {
    console.error("Error:", error.message);
  }
}


