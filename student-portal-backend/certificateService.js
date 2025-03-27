const { MongoClient, GridFSBucket } = require("mongodb");
const fs = require("fs");
const nodeHtmlToImage = require("node-html-to-image");

const mongoURI = process.env.MONGO_URI; // Change if needed

const dbConfig = {
  certificate: "certificatesDB",
  admitCard: "admitCardsDB",
};

// Function to get MongoDB GridFS Bucket
async function getMongoBucket(type) {
  const dbName = dbConfig[type];
  const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(dbName);
  return { bucket: new GridFSBucket(db), client };
}

// Function to Generate and Upload Certificate
async function generateAndUploadCertificate(info) {
  const filePath = `../outputs/certificate_${info["Student's Name"]}.png`;

  await nodeHtmlToImage({
    output: filePath,
    html: fs.readFileSync("../designs/certificate.html", "utf8"),
    content: {
        name: info["Student's Name"],
        father: info["Father's Name"],
        mother: info["Mother's Name"],
        class: info["Class"],
        section: info["Section"],
        school: info["School"],
        city: info["City"],
        nationalRank: info.nationalRank,
        cityRank: info.cityRank,
        classRank: info.classRank,
        date: info.date,
        rollNo: info.rollNo,
      },
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
      examCenter: "YOUR OWN SCHOOL",0
    puppeteerArgs: { defaultViewport: { width: 1100, height: 800 } },
    type: "png",
    quality: 100,
  });

  console.log(`Certificate generated: ${filePath}`);

  // Upload to MongoDB
  const { bucket, client } = await getMongoBucket("certificate");
  const uploadStream = bucket.openUploadStream(`certificate_${info["Student's Name"]}.png`);
  fs.createReadStream(filePath).pipe(uploadStream);

  return new Promise((resolve, reject) => {
    uploadStream.on("finish", () => {
      console.log(`Certificate uploaded: certificate_${info["Student's Name"]}.png`);
      client.close();
      resolve(`certificate_${info["Student's Name"]}.png`);
    });

    uploadStream.on("error", (err) => {
      client.close();
      reject(err);
    });
  });
}

// Function to Fetch Image from MongoDB
async function fetchImage(type, name, res) {
  if (!["certificate", "admitCard"].includes(type)) {
    return res.status(400).json({ error: "Invalid type. Use 'certificate' or 'admitCard'" });
  }

  try {
    const { bucket, client } = await getMongoBucket(type);
    const downloadStream = bucket.openDownloadStreamByName(`${type}_${name}.png`);

    res.setHeader("Content-Type", "image/png");
    downloadStream.pipe(res);

    downloadStream.on("end", () => client.close());
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ error: "File not found or server error" });
  }
}

module.exports = { generateAndUploadCertificate, fetchImage };
