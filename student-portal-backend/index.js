const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { fetchDataByMobile }= require("./service.js");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});


app.get("/get-student", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ error: "Mobile number is required" });
    }

    const mobNo = authHeader.split("Bearer ")[1];

    try {
        const studentData = await fetchDataByMobile(mobNo);
        res.json(studentData);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch student data" });
    }
});



app.get("/api/message", (req, res) => {
    return res.json({ message: "Hello from Express Backend!" });
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
