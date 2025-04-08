import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs/promises"; // Use promises version for async
import dotenv from "dotenv";
import { fetchDataByMobile } from "./service.js";
import {
  generateAdmitCard,
  dbConnection,
  uploadAdmitCard,
  fetchAdmitCardFromDB,
} from "./admitCardService.js";
import { generateAndUploadDocument, fetchImage } from "./certificateService.js";
import { fetchStudyMaterial } from "./studyMaterialService.js";
import processCSV from "./uploadCSV.js"; // Adjust extension if needed
import uploadSchoolData from "./uploadSchoolCSV.js"; // Adjust extension if needed
import {
  STUDENT_LATEST,
  getStudentsBySchoolAndClassFromLatestCollection,
} from "./newStudentModel.model.js";
import mongoose from "mongoose";
import { School } from "./school.js";
import { Admin } from "./admin.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const studentCache = {};

const uploadDir = "uploads";
if (!fs.stat(uploadDir).catch(() => fs.mkdir(uploadDir))) {
  console.log("Uploads directory created");
}

const upload = multer({ dest: "uploads/" });

app.use(cors({ origin: "*" }));
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://Backend-developer:oILMhpb5rCvtSeMD@cluster0.9joex.mongodb.net/Epoch-olympiad-foundation")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));



// API to fetch student details
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

// API to fetch students by school and class (used by frontend)
app.post("/students", async (req, res) => {
  try {
    const { schoolCode, className, rollNo, section, studentName } = req.body;

    if (!rollNo || !studentName) {
      return res.status(400).json({
        success: false,
        error: "rollNo and student name are required",
      });
    }

    const students = await getStudentsBySchoolAndClassFromLatestCollection(
      Number(schoolCode), // Convert to number
      className,
      rollNo,
      section,
      studentName
    );

    if (students.length === 0) {
      return res.status(204).json({
        success: true,
        message: "No students found matching the criteria",
      });
    }

    return res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("❌ Error in route:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// API to update single student
app.put("/student", async (req, res) => {
  try {
    const { rollNo, class: studentClass, ...updateFields } = req.body;

    if (!rollNo || !studentClass) {
      return res
        .status(400)
        .json({ message: "Roll No and Class are required" });
    }

    const updatedStudent = await STUDENT_LATEST.findOneAndUpdate(
      { rollNo, class: studentClass },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({
      message: "Error updating student",
      error: error.message || error,
    });
  }
});

// API to fetch admit-card
app.get("/fetch-admit-card/:mobNo", async (req, res) => {
  try {
    const { mobNo } = req.params;

    let studentData = studentCache[mobNo] || (await fetchDataByMobile(mobNo));
    if (!studentData || !studentData["Mob No"]) {
      return res
        .status(404)
        .json({ error: "No student found with this mobile number" });
    }
    studentCache[mobNo] = studentData;

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

// API to fetch certificate
app.get("/fetch-ceritficate/:mobNo", async (req, res) => {
  const { mobNo } = req.params;

  let studentData = studentCache[mobNo] || (await fetchDataByMobile(mobNo));
  if (!studentData || !studentData["Mob No"]) {
    return res
      .status(404)
      .json({ error: "No student found with this mobile number" });
  }
  studentCache[mobNo] = studentData;

  const studentName = studentData["Student's Name"];
  if (!studentName) {
    return res.status(400).json({ error: "Invalid student details in cache" });
  }
  fetchImage("certificate", studentName, res);
});

// API to generate & upload admit card
app.post("/admit-card", async (req, res) => {
  const { mobNo } = req.body;

  if (!mobNo) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  let studentData = studentCache[mobNo] || (await fetchDataByMobile(mobNo));
  if (!studentData || !studentData["Mob No"]) {
    return res
      .status(404)
      .json({ error: "No student found with this mobile number" });
  }
  studentCache[mobNo] = studentData;

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

// API to generate & upload certificate or admit card
app.post("/generate/:type", async (req, res) => {
  const { type } = req.params;
  const { mobNo } = req.body;

  let studentData = studentCache[mobNo] || (await fetchDataByMobile(mobNo));
  if (!studentData || !studentData["Mob No"]) {
    return res
      .status(404)
      .json({ error: "No student found with this mobile number" });
  }
  studentCache[mobNo] = studentData;

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

// API to fetch study material
app.post("/fetch-study-material", async (req, res) => {
  const { mobNo } = req.body;

  try {
    let studentData = studentCache[mobNo] || (await fetchDataByMobile(mobNo));
    if (!studentData || !studentData["Mob No"]) {
      return res
        .status(404)
        .json({ error: "No student found with this mobile number" });
    }
    studentCache[mobNo] = studentData;

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

// API to upload student data in bulk
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a CSV file" });
  }

  try {
    const response = await processCSV(req.file.path);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error uploading data" });
  }
});

// API to upload school data in bulk
app.post("/upload-schooldata", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a CSV file" });
  }

  try {
    const response = await uploadSchoolData(req.file.path);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to add single student
app.post("/add-student", async (req, res) => {
  try {
    const newStudent = new STUDENT_LATEST(req.body);
    const savedStudent = await newStudent.save();

    return res.status(201).json({
        message: "Student added successfully",
        collection: savedStudent.constructor.collection.name,
        documentId: savedStudent._id,
      });
  } catch (error) {
    console.error("❌ Error adding student:", error);
    res.status(500).json({ message: "Error adding student", error });
  }
});

app.get("/schools", async (req, res) => {
  try {
    const schools = await School.find();
    
    return res.status(200).json({schools, success:true});
  } catch (error) {
    console.error("❌ Error fetching schools:", error);
    res.status(500).json({ message: "Error fetching schools", error });
  }
})

// Health check
app.get("/health", async (req, res) => {
  res.status(200).json({ message: "Server is Healthy" });
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

  return res.status(200).json({ message: "Logged out successfully" });
});


app.post("/admin/signup", async (req, res) => {
  try {
      const { email, password } = req.body;

      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
          return res.status(400).json({ message: "Admin already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = new Admin({ email, password: hashedPassword });
      await newAdmin.save();

      return res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
      return res.status(500).json({ error: "Server error", details: err.message });
  }
});


app.post("/admin/login", async (req, res) => {
  try {
      const { email, password } = req.body;

      const admin = await Admin.findOne({ email });
      if (!admin) {
          return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" });
      }

      return res.status(200).json({ message: "Login successful" });
  } catch (err) {
      return res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is UP and RUNNING on port ${PORT}`);
});

export default app; // Optional, if you need to import app elsewhere
