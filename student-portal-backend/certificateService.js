const { MongoClient, GridFSBucket } = require("mongodb");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");


const mongoURI = process.env.MONGO_URI;



// const generate_certificate = (name) => {
//   const doc = new PDFDocument({
//     layout: "landscape",
//     size: "A4",
//   });

//   doc.pipe(fs.createWriteStream(`output.pdf`));

//   // Helper to move to next line
//   function jumpLine(doc, lines = 1) {
//     for (let i = 0; i < lines; i++) {
//       doc.moveDown();
//     }
//   }

//   // Background
//   doc.rect(0, 0, doc.page.width, doc.page.height).fill("#ffffff");

//   // Outer Border
//   const margin = 18;
//   doc
//     .lineWidth(20)
//     .strokeColor("#0e8cc3")
//     .rect(
//       margin,
//       margin,
//       doc.page.width - margin * 2,
//       doc.page.height - margin * 2
//     )
//     .stroke();

//   const maxWidth = 140;
//   const maxHeight = 100;
//   doc.image("assets/logo.png", doc.page.width / 2 - maxWidth / 2, 60, {
//     fit: [maxWidth, maxHeight],
//     align: "center",
//   });

//   // Header Text
//   jumpLine(doc, 5);
//   doc.fillColor("#021c27").fontSize(10);
//   // .text("Super Course for Awesomes", { align: "center" });

//   jumpLine(doc, 2);
//   doc.fontSize(18).text("CERTIFICATE OF COMPLETION", { align: "center" });

//   jumpLine(doc, 1);
//   doc.fontSize(10).text("Presented to", { align: "center" });

//   jumpLine(doc, 2);
//   doc.fontSize(24).text(name.toUpperCase(), { align: "center" });

//   jumpLine(doc, 1);
//   doc
//     .fontSize(10)
//     .text("Successfully completed the Super Course for Awesomes.", {
//       align: "center",
//     });

//   // Signatures
//   jumpLine(doc, 5);

//   const lineSize = 174;
//   const y = 390;

//   const lines = [
//     { x: 128, name: "Mr. Professor", title: "Professor" },
//     { x: 128 + lineSize + 32, name: name, title: "Student" },
//     { x: 128 + (lineSize + 32) * 2, name: "Jane Doe", title: "Director" },
//   ];

//   doc.strokeColor("#021c27").lineWidth(1).strokeOpacity(0.2);

//   lines.forEach(({ x }) => {
//     doc
//       .moveTo(x, y)
//       .lineTo(x + lineSize, y)
//       .stroke();
//   });

//   doc.fillOpacity(1).strokeOpacity(1);

//   lines.forEach(({ x, name, title }) => {
//     doc
//       .fontSize(10)
//       .fillColor("#021c27")
//       .text(name, x, y + 10, { width: lineSize, align: "center" });

//     doc
//       .fontSize(10)
//       .text(title, x, y + 25, { width: lineSize, align: "center" });
//   });

//   // Footer QR Image
//   const qrWidth = 60;
//   const qrHeight = 60;
//   const qrX = doc.page.width / 2 - qrWidth / 2;
//   const qrY = 450;

//   try {
//     const qrPath = path.resolve("assets/qr.png");
//     doc.image(qrPath, qrX, qrY, {
//       fit: [qrWidth, qrHeight],
//       align: "center",
//     });
//   } catch (err) {
//     console.error("Failed to load QR image:", err.message);
//   }

//   doc.end();
// };




async function getMongoBucket(type) {
  const dbName = "test";
  const client = await MongoClient.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);

  return { bucket: new GridFSBucket(db), client };
}

// async function generatePDF(info, outputPath, type) {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument({ layout: "landscape", size: "A4" });
//     const stream = fs.createWriteStream(outputPath);
//     doc.pipe(stream);

//     doc.rect(0, 0, doc.page.width, doc.page.height).fill("#ffffff");

//     const margin = 18;
//     doc.lineWidth(20).strokeColor("#0e8cc3").rect(
//       margin,
//       margin,
//       doc.page.width - margin * 2,
//       doc.page.height - margin * 2
//     ).stroke();

//     const maxWidth = 140;
//     const maxHeight = 100;
//     const logoPath = path.join(__dirname, "assets", "logo.png");
//     if (fs.existsSync(logoPath)) {
//       doc.image(logoPath, doc.page.width / 2 - maxWidth / 2, 60, {
//         fit: [maxWidth, maxHeight],
//         align: "center",
//       });
//     }

//     doc.fontSize(18).text(type.toUpperCase().replace("_", " "), { align: "center" });
//     doc.moveDown();
//     doc.fontSize(10).text("Presented to", { align: "center" });
//     doc.moveDown();
//     doc.fontSize(24).text(info["Student's Name"].toUpperCase(), { align: "center" });
//     doc.moveDown();
//     doc.fontSize(10).text(`Successfully completed the course at ${info["School"]}.`, { align: "center" });

//     doc.moveDown(5);
//     const lineSize = 174;
//     const y = 390;
//     const lines = [
//       { x: 128, name: "Mr. Professor", title: "Professor" },
//       { x: 128 + lineSize + 32, name: info["Student's Name"], title: "Student" },
//       { x: 128 + (lineSize + 32) * 2, name: "Jane Doe", title: "Director" },
//     ];
//     doc.strokeColor("#021c27").lineWidth(1).strokeOpacity(0.2);
//     lines.forEach(({ x }) => {
//       doc.moveTo(x, y).lineTo(x + lineSize, y).stroke();
//     });
//     doc.fillOpacity(1).strokeOpacity(1);
//     lines.forEach(({ x, name, title }) => {
//       doc.fontSize(10).fillColor("#021c27").text(name, x, y + 10, { width: lineSize, align: "center" });
//       doc.fontSize(10).text(title, x, y + 25, { width: lineSize, align: "center" });
//     });

//     doc.end();
//     stream.on("finish", () => resolve(outputPath));
//     stream.on("error", reject);
//   });
// }



async function generatePDF(info, outputPath, type) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ layout: "landscape", size: "A4" });
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Set background color
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#ffffff");

    const margin = 20;
    const contentWidth = doc.page.width - 2 * margin;

    // Border
    doc.lineWidth(20)
      .strokeColor("#0e8cc3")
      .rect(margin, margin, contentWidth, doc.page.height - 2 * margin)
      .stroke();

    // Logo Placement
    const maxWidth = 120;
    const maxHeight = 90;
    const logoPath = path.join(__dirname, "assets", "logo.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, doc.page.width / 2 - maxWidth / 2, 50, {
        fit: [maxWidth, maxHeight],
        align: "center",
      });
    }

    // Title
    doc.fillColor("#000000").fontSize(22).text("CERTIFICATE", {
      align: "center",
    });

    doc.moveDown(0.5);

    // "Presented to" text
    doc.fontSize(12).text("Presented to", { align: "center" });
    doc.moveDown(0.5);

    // Student Name
    doc.fontSize(28).font("Helvetica-Bold").text(info["Student's Name"], {
      align: "center",
    });

    doc.moveDown(0.8);

    // Course completion text
    doc.fontSize(12).font("Helvetica").text(
      `Successfully completed the course at ${info["School"]}.`,
      { align: "center" }
    );

    doc.moveDown(3); // Add spacing for the signature section

    // Signature lines
    const lineSize = 180;
    const signatureY = doc.page.height - 120;

    const signatureDetails = [
      { x: margin + 50, name: "Mr. Professor", title: "Professor" },
      {
        x: doc.page.width / 2 - lineSize / 2,
        name: info["Student's Name"],
        title: "Student",
      },
      {
        x: doc.page.width - margin - lineSize - 50,
        name: "Jane Doe",
        title: "Director",
      },
    ];

    doc.strokeColor("#021c27").lineWidth(1).strokeOpacity(0.4);

    signatureDetails.forEach(({ x }) => {
      doc.moveTo(x, signatureY)
        .lineTo(x + lineSize, signatureY)
        .stroke();
    });

    doc.fillOpacity(1).strokeOpacity(1);

    // Names & Titles Below Signature Lines
    signatureDetails.forEach(({ x, name, title }) => {
      doc.fontSize(10).fillColor("#021c27").text(name, x, signatureY + 8, {
        width: lineSize,
        align: "center",
      });
      doc.fontSize(10).text(title, x, signatureY + 22, {
        width: lineSize,
        align: "center",
      });
    });

    // Finalizing the PDF
    doc.end();

    stream.on("finish", () => resolve(outputPath));
    stream.on("error", reject);
  });
}


async function generateAndUploadDocument(info, type) {
  const fileName = `${type}_${info["Student's Name"]}.pdf`;
  const outputDir = path.join(__dirname, "outputs");
  const outputPath = path.join(outputDir, fileName);

  try {
    const { bucket, client } = await getMongoBucket(type);

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

    await generatePDF(info, outputPath, type);

   

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
    console.error("❌ Error generating/uploading document:", error);
    throw new Error("Operation failed");
  }
}

async function fetchImage(type, name, res) {
  if (!["certificate", "admitCard"].includes(type)) {
    return res.status(400).json({ error: "Invalid type. Use 'certificate' or 'admitCard'" });
  }
  try {
    const { bucket, client } = await getMongoBucket(type);
    const fileName = `${type}_${name}.pdf`;
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
    console.error("❌ Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { generateAndUploadDocument, fetchImage };
