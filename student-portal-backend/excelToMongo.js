import XLSX from "xlsx";
import { MongoClient } from "mongodb";

// MongoDB connection details
const uri = "mongodb+srv://Backend-developer:oILMhpb5rCvtSeMD@cluster0.9joex.mongodb.net/Epoch-olympiad-foundation";
const dbName = "Epoch-olympiad-foundation";
const collectionName = "student_data_latests"; // Match Mongoose model collection name

// Fields to explicitly convert to strings
const stringFields = ["rollNo", "schoolCode"];
const renameFields = { class: "class" }; // Rename 'class' to 'standard'

// Function to check if a value is numeric (integer or float)
const isNumeric = (value) => typeof value === "number" && !isNaN(value);

// Function to convert Excel to MongoDB with type conversions
async function excelToMongoDB(filePath) {
  try {
    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[1]; // Sheet 2 (index 1)
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Extract headers (first row) and rename if necessary
    const headers = data[0].map((header) => renameFields[header] || header);

    // Convert rows to documents with type conversions
    const documents = data.slice(1).map((row) => {
      const doc = {};
      headers.forEach((header, index) => {
        let value = row[index] !== undefined ? row[index] : null;

        // Special handling for 'Duplicates' to convert to Boolean
        if (header === "Duplicates") {
          value = value === "1" || value === 1 || value === true;
        }
        // Convert numeric values to strings except for Duplicates
        else if (isNumeric(value)) {
          value = String(value);
        }
        // Explicitly convert specified fields to strings
        if (stringFields.includes(header)) {
          value = value !== null ? String(value) : null;
        }
        // Handle null or undefined as empty string
        doc[header] = value !== null ? value : "";
      });
      return doc;
    });

    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect().then(() => {
      console.log("Connected to MongoDB");
    });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert documents
    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents inserted successfully`);

    // Close connection
    await client.close();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Execute the function
excelToMongoDB("./copy.xlsx");