const mongoose = require("mongoose");
const XLSX = require("xlsx");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

const School =  mongoose.models.existingModel || mongoose.model("schools-data", schoolSchema);

const expectedHeaders = [
  "School Code",
  "School Name",
  "Email Id",
  "FAX",
  "Area",
  "City",
  "Country",
  "Incharge",
  "DOB", 
  "Mob No.",
  "Principal Name",
  "DOB",     
  "Mob No.",
  "Remark",
];


function validateSchema(sheetHeaders) {
  return expectedHeaders.every((header) => sheetHeaders.includes(header));
}

async function convertXlsxToMongo(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: "", header: 1 });
    const headers = data[0];
    if (!validateSchema(headers)) {
      const message = "❌ Schema does not match. Please upload a valid Excel file.";
      console.error(message);
      if (res) {
        return res.status(400).json({ success: false, error: message });
      }
      return;
    }

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
      inchargeDob : row["DOB"],
      schoolMobNo: row["Mob No."] || "",
      principalName: row["Principal Name"] || "",
      principalDob:  row["DOB"] || "", 
      principalMobNo: row["Mob No."] || "",
      remark: row["Remark"] || "",
    }));

    await School.deleteMany({});
    await School.insertMany(schools);

    console.log(`✅ Inserted ${schools.length} school records successfully.`);
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting school data:", err);
    mongoose.connection.close();
  }
}

module.exports = { convertXlsxToMongo, School };
