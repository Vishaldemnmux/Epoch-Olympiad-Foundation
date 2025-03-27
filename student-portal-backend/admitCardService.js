const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { MongoClient, GridFSBucket } = require("mongodb");
const mongoURI = process.env.MONGO_URI;


async function databaseConnection() {
  const client = new MongoClient(mongoURI);
  await client.connect();
  return { conn: client.db("test"), status: "success" };
}

async function generateAdmitCard(info) {
  try {
    const outputDir = "./outputs";
    clearOutputDirectory(outputDir);
    const outputPath = `./outputs/admitCard_${info["Student's Name"]}.png`;

    const templatePath = path.join(__dirname, "designs", "admitCard.html");
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }

    await nodeHtmlToImage({
      output: outputPath,
      html: fs.readFileSync(templatePath, "utf8"),
      content: {
        name: info["Student's Name"],
        father: info["Father's Name"],
        mother: info["Mother's Name"],
        class: info["Class"],
        section: info["Section"],
        rollNo: info["Roll No"],
        school: info["School"],
        schoolCode: info["School Code"],
        mobile: info["Mob No"],
        city: info["City"],
        state: info["State"],
        country: info["Country"],
        examCenter: "YOUR OWN SCHOOL",
        qrUrl:
          "https://api.qrserver.com/v1/create-qr-code/?data=https://wa.me/919999999999&size=100x100",
      },
      puppeteerArgs: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        defaultViewport: {
          width: 900,
          height: 1100,
        },
      },
      type: "png",
      quality: 100,
    });

    return { success: true, path: outputPath };
  } catch (error) {
    console.error("Error generating admit card:", error);
    return { success: false, error: error.message };
  }
}



function clearOutputDirectory(outputDir) {
  if (fs.existsSync(outputDir)) {
    fs.readdirSync(outputDir).forEach((file) => {
      const filePath = path.join(outputDir, file);
      fs.unlinkSync(filePath);
    });
  } else {
    fs.mkdirSync(outputDir, { recursive: true });
  }
}



async function dbConnection() {
  try {
    const conn = await mongoose.createConnection(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return new Promise((resolve, reject) => {
      conn.once("open", async () => {
        console.log(`Connected to MongoDB Cluster: ${conn.client.s.options.srvHost}`);
        console.log(`Database Name: ${conn.db.databaseName}`);

        const collections = await conn.db.listCollections().toArray();
        const collectionNames = collections.map((col) => col.name);

        if (collectionNames.includes("admitCards.files") && collectionNames.includes("admitCards.chunks")) {
          console.log("✅ GridFS collection 'admitCards' already exists.");
        } else {
          console.log("⚠️ Creating GridFS bucket for admit cards...");
          new GridFSBucket(conn.db, { bucketName: "admitCards" });
          console.log("✅ GridFS collections created successfully!");
        }

        resolve({ status: "success", conn });
      });

      conn.on("error", (err) => {
        console.error("❌ MongoDB Connection Error:", err);
        reject({ status: "failed", error: err.message });
      });
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
    return { status: "failed", error: error.message };
  }
}



async function uploadAdmitCard(studentData, res) {
  try {
    console.log("📂 Checking if admit card exists...");

    const admitCardPath = `./outputs/admitCard_${studentData["Student's Name"]}.png`;
    if (!fs.existsSync(admitCardPath)) {
      throw new Error("Admit card file does not exist.");
    }

    console.log("📂 Connecting to Database...");
    const dbResponse = await dbConnection();
    if (dbResponse.status !== "success") {
      return res.status(500).json({ error: "Database connection failed" });
    }

    const db = dbResponse.conn.db;
    const gfs = new GridFSBucket(db, { bucketName: "admitCards" });

    // Check if admit card already exists in GridFS
    const existingFiles = await db
      .collection("admitCards.files")
      .findOne({ filename: `admitCard_${studentData["Student's Name"]}.png` });

    if (existingFiles) {
      console.log("⚠️ Admit card already exists in GridFS. Skipping upload.");
      return res.status(200).json({
        message: "Admit card already exists in storage",
        fileId: existingFiles._id,
      });
    }

    console.log("📂 Reading file from directory!");
    const fileStream = fs.createReadStream(admitCardPath);

    console.log("📝 Writing file using GridFS...");
    const writeStream = gfs.openUploadStream(`admitCard_${studentData["Student's Name"]}.png`, {
      contentType: "image/png",
      metadata: { studentId: studentData["_id"], mobNo: studentData["Mob No"] },
    });

    console.log("📡 Piping file to GridFS...");
    fileStream.pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("✅ File uploaded successfully!");
      fs.unlinkSync(admitCardPath); // Delete local file after upload

      if (!res.headersSent) {
        return res.status(200).json({
          message: "Admit card stored successfully",
          fileId: writeStream.id,
        });
      }
    });

    writeStream.on("error", (err) => {
      console.error("❌ Upload Error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to upload admit card" });
      }
    });

  } catch (error) {
    console.error("❌ Error processing admit card:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
}


async function fetchAdmitCardFromDB(studentName, res) {
  try {
    const dbResponse = await databaseConnection();
    if (dbResponse.status !== "success") {
      return res.status(500).json({ error: "Database connection failed" });
    }

    const db = dbResponse.conn;
    const gfs = new GridFSBucket(db, { bucketName: "admitCards" });
    console.log(`🔍 Searching for filename: admitCard_${studentName}.png`);
    // Check if admit card exists
    const fileExists = await db.collection("admitCards.files").findOne({ filename: `admitCard_${studentName}.png` });

    if (!fileExists) {
      return res.status(404).json({ error: "Admit card not found" });
    }

    // Stream File as Response
    res.setHeader("Content-Type", "image/png");
    const readStream = gfs.openDownloadStream(fileExists._id);
    readStream.pipe(res);

    console.log("✅ Admit card sent successfully!");

  } catch (error) {
    console.error("❌ Error fetching admit card:", error);
    res.status(500).json({ error: "Failed to fetch admit card" });
  }
}



module.exports = { generateAdmitCard, dbConnection, uploadAdmitCard, fetchAdmitCardFromDB};
