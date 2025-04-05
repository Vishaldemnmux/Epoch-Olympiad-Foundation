const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const { fetchDataByMobile } = require("./service.js");
const {
  generateAdmitCard,
  dbConnection,
  uploadAdmitCard,
  fetchAdmitCardFromDB,
} = require("./admitCardService.js");
const {
  generateAndUploadDocument,
  fetchImage,
} = require("./certificateService.js");
const { fetchStudyMaterial } = require("./studyMaterialService.js");
const processCSV = require("./uploadCSV");
const uploadSchoolData = require("./uploadSchoolCSV");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT;
const studentCache = {};
const School = require("./school");
const Student = require("./student");

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({ dest: "uploads/" });

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

app.get("/get-student", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  const mobNo = authHeader.split("Bearer ")[1];

  if (studentCache[mobNo]) {
    return res
      .status(200)
      .json({ studentData: studentCache[mobNo], mobile: mobNo });
  }

  try {
    const studentData = await fetchDataByMobile(mobNo);

    if (studentData["Mob No"]) {
      studentCache[mobNo] = studentData;
      return res
        .status(200)
        .json({ studentData, mobile: studentData["Mob No"] });
    }

    return res
      .status(404)
      .json({ error: "No student found with this mobile number" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student data", error });
  }
});

app.post("/admit-card", async (req, res) => {
  const { mobNo } = req.body;

  if (!mobNo) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  let studentData;

  if (studentCache[mobNo]) {
    studentData = studentCache[mobNo];
  } else {
    studentData = await fetchDataByMobile(mobNo);
    if (!studentData || !studentData["Mob No"]) {
      return res
        .status(404)
        .json({ error: "No student found with this mobile number" });
    }
    studentCache[mobNo] = studentData;
  }
  try {
    const result = await generateAdmitCard(studentData);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    await dbConnection(); // Ensure DB is connected

    await uploadAdmitCard(studentData, res);

    if (!res.headersSent) {
      return res.status(200).json({
        message: "Admit card generated and stored successfully",
        path: result.path,
      });
    }
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.post("/logout", (req, res) => {
  const { mobNo } = req.body;
  const outputDir = path.join(__dirname, "outputs");
  if (fs.existsSync(outputDir)) {
    fs.readdirSync(outputDir).forEach((file) => {
      const filePath = path.join(outputDir, file);
      fs.unlinkSync(filePath); // Delete file
    });
  }

  const uploadsDir = path.join(__dirname, "uploads");
  if (fs.existsSync(uploadsDir)) {
    fs.readdirSync(uploadsDir).forEach((file) => {
      const filePath = path.join(uploadsDir, file);
      fs.unlinkSync(filePath);
    });
  }

  if (mobNo && studentCache[mobNo]) {
    delete studentCache[mobNo];
  }

  res.status(200).json({ message: "Logged out successfully" });
});

app.get("/fetch-admit-card/:mobNo", async (req, res) => {
  try {
    const { mobNo } = req.params;

    let studentData;
    if (studentCache[mobNo]) {
      studentData = studentCache[mobNo];
    } else {
      studentData = await fetchDataByMobile(mobNo);
      if (!studentData || !studentData["Mob No"]) {
        return res
          .status(404)
          .json({ error: "No student found with this mobile number" });
      }
      studentCache[mobNo] = studentData;
    }

    const studentName = studentData["Student's Name"];
    if (!studentName) {
      return res
        .status(400)
        .json({ error: "Invalid student details in cache" });
    }
    await fetchAdmitCardFromDB(studentName, res);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

// API to Generate & Upload Certificate/Admit Card
app.post("/generate/:type", async (req, res) => {
  const { type } = req.params;
  const { mobNo } = req.body;

  if (studentCache[mobNo]) {
    studentData = studentCache[mobNo];
  } else {
    studentData = await fetchDataByMobile(mobNo);
    if (!studentData || !studentData["Mob No"]) {
      return res
        .status(404)
        .json({ error: "No student found with this mobile number" });
    }
    studentCache[mobNo] = studentData;
  }

  const studentName = studentData["Student's Name"];
  if (!studentName) {
    return res.status(400).json({ error: "Invalid student details in cache" });
  }
  if (!["certificate", "admitCard"].includes(type)) {
    return res
      .status(400)
      .json({ error: "Invalid type. Use 'certificate' or 'admitCard'" });
  }

  try {
    const fileName = await generateAndUploadDocument(studentData, type);
    res.json({
      message: `${type} generated and uploaded successfully!`,
      fileName,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error generating/uploading ${type}`,
      details: error.message,
    });
  }
});

// API to Fetch Certificate
app.get("/fetch-ceritficate/:mobNo", async (req, res) => {
  const { mobNo } = req.params;

  if (studentCache[mobNo]) {
    studentData = studentCache[mobNo];
  } else {
    studentData = await fetchDataByMobile(mobNo);
    if (!studentData || !studentData["Mob No"]) {
      return res
        .status(404)
        .json({ error: "No student found with this mobile number" });
    }
    studentCache[mobNo] = studentData;
  }

  const studentName = studentData["Student's Name"];
  if (!studentName) {
    return res.status(400).json({ error: "Invalid student details in cache" });
  }
  fetchImage("certificate", studentName, res);
});



app.post("/fetch-study-material", async (req, res) => {
  const { mobNo } = req.body;

  try {
    let studentData;
    if (studentCache[mobNo]) {
      studentData = studentCache[mobNo];
    } else {
      studentData = await fetchDataByMobile(mobNo);

      if (!studentData || !studentData["Mob No"]) {
        return res
          .status(404)
          .json({ error: "No student found with this mobile number" });
      }
      studentCache[mobNo] = studentData;
    }
    const studentClass = studentData["Class"];
    if (!studentClass) {
      return res
        .status(400)
        .json({ error: "Invalid student details in cache" });
    }
    const materials = await fetchStudyMaterial(studentClass);
    res.status(200).json({ success: true, data: materials });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a CSV file" });
  }

  try {
    const response = await processCSV(req.file.path);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error uploading data" });
  }
});



app.post("/upload-schooldata", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a CSV file" });
  }

  try {
    const response = await uploadSchoolData(req.file.path);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});



app.post("/add-student", async (req, res) => {

  try {


    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();


    res.status(201).json({
      message: "Student added successfully",
      collection: savedStudent.constructor.collection.name,
      documentId: savedStudent._id,
    });
  } catch (error) {
    console.error("❌ Error adding student:", error);
    res.status(500).json({ message: "Error adding student", error });
  }
});



app.post("/add-school", async (req, res) => {

  try {


    const newSchool = new School(req.body);
    const savedSchool = await newSchool.save();


    res.status(201).json({
      message: "School added successfully",
      collection: savedSchool.constructor.collection.name,
      documentId: savedSchool._id,
    });
  } catch (error) {
    console.error("❌ Error adding school:", error);
    res.status(500).json({ message: "Error adding school", error });
  }
});



app.delete("/school", async (req, res) => {
  try {
    const { schoolCode } = req.body;
    const deletedSchool = await School.findOneAndDelete({ "School Code": schoolCode });

    if (!deletedSchool) {
      return res.status(404).json({ message: "School not found" });
    }

    res.json({ message: "School deleted successfully", deletedSchool });
  } catch (error) {
    res.status(500).json({ message: "Error deleting school", error });
  }
});


app.delete("/student", async (req, res) => {
  try {
    const { rollNo, studentClass } = req.body; 

    const deletedStudent = await Student.findOneAndDelete({
      "Roll No": { "": rollNo }, 
      "Class": studentClass
    });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully", deletedStudent });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
});




app.put("/student", async (req, res) => {
  try {
    let { rollNo, studentClass, ...updateFields } = req.body;

    if (!rollNo || !studentClass) {
      return res.status(400).json({ message: "Roll No and Class are required" });
    }

    studentClass = studentClass.toString();
    rollNo = rollNo.toString();

    const updatedStudent = await Student.findOneAndUpdate(
      { "Roll No": { "": rollNo }, "Class ": studentClass },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student", error: error.message || error });
  }
});


app.put("/school", async (req, res) => {
  try {
    let { schoolCode, ...updateFields } = req.body; 

    if (!schoolCode) {
      return res.status(400).json({ message: "School Code is required" });
    }
    
    schoolCode = schoolCode.toString();

    const updatedSchool = await School.findOneAndUpdate(
      { "School Code": schoolCode },
      { $set: updateFields }, 
      { new: true, runValidators: true }
    );

    if (!updatedSchool) {
      return res.status(404).json({ message: "School not found" });
    }

    res.json({ message: "School updated successfully", updatedSchool });
  } catch (error) {
    res.status(500).json({ message: "Error updating school", error });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
