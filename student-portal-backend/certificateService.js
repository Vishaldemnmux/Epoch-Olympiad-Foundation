const { MongoClient, GridFSBucket } = require("mongodb");
const fs = require("fs");
const path = require("path");
const nodeHtmlToImage = require("node-html-to-image");
const { pipeline } = require("stream/promises");
const mongoURI = process.env.MONGO_URI; // MongoDB Connection String



// Function to get MongoDB GridFS Bucket
async function getMongoBucket(type) {
  const dbName = "test";
  const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(dbName);

  // Ensure collection exists (MongoDB auto-creates it when inserting data)
  await db.listCollections({ name: `${type}.files` }).hasNext().then(async (exists) => {
    if (!exists) {
      console.log(`Database "${dbName}" does not exist, creating it...`);
      await db.createCollection(`${type}.files`); // Create collection if not exists
    }
  });

  return { bucket: new GridFSBucket(db), client };
}

// Function to Generate and Upload Certificate
async function generateAndUploadCertificate(info) {
    const fileName = `certificate_${info["Student's Name"]}.png`;
    const outputDir = path.join(__dirname, "outputs");
    const outputPath = path.join(outputDir, fileName);
  
    try {
      const { bucket, client } = await getMongoBucket();
  
      // 🔹 Ensure "outputs" folder exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
  
      // 🔹 Check if certificate already exists in GridFS
      const existingFile = await bucket.find({ filename: fileName }).toArray();
      if (existingFile.length > 0) {
        console.log(`✅ Certificate ${fileName} already exists in MongoDB. Skipping upload.`);
        client.close();
        return fileName;
      }
  
      // 🔹 Check if certificate exists in the output folder and delete it
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
        console.log(`🗑 Deleted existing local certificate: ${outputPath}`);
      }
  
      const templatePath = path.join(__dirname, "designs", "certificate.html");
      if (!fs.existsSync(templatePath)) {
        throw new Error(`❌ Template file not found: ${templatePath}`);
      }
  
      // 🔹 Generate certificate image from HTML template
      await nodeHtmlToImage({
        output: outputPath,
        html: fs.readFileSync(templatePath, "utf8"),
        content: {
          name: info["Student's Name"],
          father: info["Father's Name"],
          mother: info["Mother's Name"],
          class: info["Class"],
          section: info["Section"],
          school: info["School"],
          city: info["City"],
          nationalRank: info["nationalRank"] || "Unknown",
          cityRank: info["cityRank"] || "Unknown",
          classRank: info["classRank"] || "Unknown",
          date: new Date().toISOString().split("T")[0], // Current Date
          rollNo: info["Roll No"],
        },
        puppeteerArgs: { defaultViewport: { width: 1100, height: 800 } },
        type: "png",
        quality: 100,
      });
  
      console.log(`📜 Certificate generated: ${outputPath}`);
  
      await new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(outputPath);
        const uploadStream = bucket.openUploadStream(fileName);
  
        readStream.pipe(uploadStream);
  
        uploadStream.on("finish", () => {
          console.log(`✅ Certificate uploaded to MongoDB: ${fileName}`);
          client.close();
          resolve(fileName);
        });
  
        uploadStream.on("error", (err) => {
          console.error("❌ GridFS Upload Error:", err);
          client.close();
          reject(err);
        });
      });
  
      return fileName;
    } catch (error) {
      console.error("❌ Error generating/uploading certificate:", error);
      throw new Error("Operation failed");
    }
  }

// Function to Fetch Image from MongoDB
async function fetchImage(type, name, res) {
    console.log(`🔹 Fetch request received for type: ${type}, name: ${name}`);
  
    if (!["certificate", "admitCard"].includes(type)) {
      console.log(`❌ Invalid type received: ${type}`);
      return res.status(400).json({ error: "Invalid type. Use 'certificate' or 'admitCard'" });
    }
  
    try {
      console.log(`🔹 Connecting to MongoDB GridFS for type: ${type}...`);
      const { bucket, client, db } = await getMongoBucket(type);  // Check DB Connection
      
  
      const fileName = `${type}_${name}.png`;
      console.log(`🔹 Looking for file: ${fileName} in GridFS...`);
  
      // 🔹 Check if file exists before opening the download stream
      const files = await bucket.find({ filename: fileName }).toArray();
      console.log(`🔹 Query executed, files found: ${files.length}`);
  
      if (files.length === 0) {
        console.log(`❌ File not found in MongoDB: ${fileName}`);
        client.close();
        return res.status(404).json({ error: "File not found" });
      }
  
      console.log(`✅ File found: ${fileName}. Starting download...`);
  
      // 🔹 Fetch file from MongoDB GridFS
      const downloadStream = bucket.openDownloadStreamByName(fileName);
      res.setHeader("Content-Type", "image/png");
  
      downloadStream.on("data", () => console.log(`📥 Streaming file: ${fileName}`));
      downloadStream.on("end", () => {
        console.log(`✅ File streaming completed: ${fileName}`);
        client.close();
      });
  
      downloadStream.on("error", (err) => {
        console.error(`❌ Error streaming file: ${err}`);
        client.close();
        res.status(500).json({ error: "Error retrieving file" });
      });
  
      downloadStream.pipe(res);
    } catch (error) {
      console.error(`❌ Unexpected error:`, error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
module.exports = { generateAndUploadCertificate, fetchImage };