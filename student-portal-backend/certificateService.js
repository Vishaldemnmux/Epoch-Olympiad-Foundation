const { MongoClient, GridFSBucket } = require("mongodb");
const fs = require("fs");
const path = require("path");
const nodeHtmlToImage = require("node-html-to-image");
const mongoURI = process.env.MONGO_URI; 



async function getMongoBucket(type) {
  const dbName = "test";
  const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(dbName);

  await db.listCollections({ name: `${type}.files` }).hasNext().then(async (exists) => {
    if (!exists) {
      await db.createCollection(`${type}.files`); 
    }
  });

  return { bucket: new GridFSBucket(db), client };
}


async function generateAndUploadCertificate(info) {
    const fileName = `certificate_${info["Student's Name"]}.png`;
    const outputDir = path.join(__dirname, "outputs");
    const outputPath = path.join(outputDir, fileName);
  
    try {
      const { bucket, client } = await getMongoBucket();
  
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
  
      const existingFile = await bucket.find({ filename: fileName }).toArray();
      if (existingFile.length > 0) {
        client.close();
        return fileName;
      }

      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
  
      const templatePath = path.join(__dirname, "designs", "certificate.html");
      if (!fs.existsSync(templatePath)) {
        throw new Error(`❌ Template file not found: ${templatePath}`);
      }

      const logoPath = path.join(__dirname, "assets", "logo.png");
      
      const logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
      const logoSrc = `data:image/png;base64,${logoBase64}`; // change to image/jpeg if your file is .jpg
      
  
      await nodeHtmlToImage({
        output: outputPath,
        html: fs.readFileSync(templatePath, "utf8"),
        content: {
            logoSrc,
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
          examCenter: info["Exam Centre"],
        },
        puppeteerArgs: { defaultViewport: { width: 1100, height: 800 } },
        type: "png",
        quality: 100,
      });
  
  
      await new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(outputPath);
        const uploadStream = bucket.openUploadStream(fileName);
  
        readStream.pipe(uploadStream);
  
        uploadStream.on("finish", () => {
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


async function fetchImage(type, name, res) {
  
    if (!["certificate", "admitCard"].includes(type)) {
      return res.status(400).json({ error: "Invalid type. Use 'certificate' or 'admitCard'" });
    }
  
    try {
      const { bucket, client, db } = await getMongoBucket(type);  // Check DB Connection
      
  
      const fileName = `${type}_${name}.png`;
  
      const files = await bucket.find({ filename: fileName }).toArray();
  
      if (files.length === 0) {
        client.close();
        return res.status(404).json({ error: "File not found" });
      }
  
  
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