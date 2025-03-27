const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { fetchDataByMobile } = require("./service.js");
const { generateAdmitCard, dbConnection, uploadAdmitCard, fetchAdmitCardFromDB, } =  require("./admitCardService.js");
const { generateAndUploadCertificate, fetchImage } = require("./certificateService.js");
const app = express();
const PORT = process.env.PORT;
const studentCache = {}; 
app.use(cors());
app.use(express.json());

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
    return res.status(200).json({ studentData: studentCache[mobNo], mobile: mobNo });
  }

  try {
    const studentData = await fetchDataByMobile(mobNo);

    if (studentData["Mob No"]) {
      studentCache[mobNo] = studentData; 
      return res.status(200).json({ studentData, mobile: studentData["Mob No"] });
    }

    return res.status(404).json({ error: "No student found with this mobile number" });
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
      return res.status(404).json({ error: "No student found with this mobile number" });
    }
    studentCache[mobNo] = studentData;
  }
  try {
    const result = await generateAdmitCard(studentData);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    console.log("Admit card generated successfully:", result.path);

   
    await dbConnection(); // Ensure DB is connected

    const uploadResult = await uploadAdmitCard(studentData, res);
    
    // if (!uploadResult.success) {
    //   return res.status(500).json({ error: uploadResult.error });
    // }

    if (!res.headersSent) {  // Prevent multiple responses
      return res.status(200).json({ 
        message: "Admit card generated and stored successfully", 
        path: result.path 
      });
    }
  } catch (error) {
    console.error("❌ Error processing admit card:", error);
    if (!res.headersSent) { // Ensure only one response is sent
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});




app.post("/logout", (req, res) => {
  const { mobNo } = req.body;

  if (mobNo && studentCache[mobNo]) {
    delete studentCache[mobNo]; 
  }

  res.status(200).json({ message: "Logged out successfully" });
});



app.get("/fetch-admit-card", async (req, res) => {
  try {
    const { mobNo } = req.body;
    console.log(`🔍 Fetching admit card for mobile number: ${mobNo}`);
    let studentData;
    // Fetch Student Data from Cache
    if (studentCache[mobNo]) {
      studentData = studentCache[mobNo];
    } else {
      studentData = await fetchDataByMobile(mobNo);
      if (!studentData || !studentData["Mob No"]) {
        return res.status(404).json({ error: "No student found with this mobile number" });
      }
      studentCache[mobNo] = studentData;
    }

    const studentName = studentData["Student's Name"];
    if (!studentName) {
      return res.status(400).json({ error: "Invalid student details in cache" });
    }

    // Call Function to Fetch Admit Card from DB
    await fetchAdmitCardFromDB(studentName, res);

  } catch (error) {
    console.error("❌ Error processing request:", error);
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
      return res.status(404).json({ error: "No student found with this mobile number" });
    }
    studentCache[mobNo] = studentData;
  }

  const studentName = studentData["Student's Name"];
  if (!studentName) {
    return res.status(400).json({ error: "Invalid student details in cache" });
  }
  if (!["certificate", "admitCard"].includes(type)) {
    return res.status(400).json({ error: "Invalid type. Use 'certificate' or 'admitCard'" });
  }

  try {
    const fileName = await generateAndUploadCertificate(studentData, type);
    res.json({ message: `${type} generated and uploaded successfully!`, fileName });
  } catch (error) {
    res.status(500).json({ error: `Error generating/uploading ${type}`, details: error.message });
  }
});

// API to Fetch Certificate/Admit Card
app.get("/:type/", async (req, res) => {
  const { mobNo } = req.body;

  if (studentCache[mobNo]) {
    studentData = studentCache[mobNo];
  } else {
    studentData = await fetchDataByMobile(mobNo);
    if (!studentData || !studentData["Mob No"]) {
      return res.status(404).json({ error: "No student found with this mobile number" });
    }
    studentCache[mobNo] = studentData;
  }

  const studentName = studentData["Student's Name"];
  if (!studentName) {
    return res.status(400).json({ error: "Invalid student details in cache" });
  }
  fetchImage(req.params.type, studentName, res);
});






app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
