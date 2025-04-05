const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connected");
})
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const studyMaterialSchema = new mongoose.Schema({
  id: Number,
  class: Number,
  category: String,
  examId: String,
  cost: Number,
  strikeThroughCost: Number,
  isAvailableForFree: String
});

const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema, "study-material");

async function fetchStudyMaterial(studentClass) {
    if (!studentClass) {
    console.error("🚨 Error: Class information not found for the student");
    throw new Error("Class information not found for the student");
  }
  try {
    const materials = await StudyMaterial.find({ class: studentClass });    
    if (materials.length === 0) {
      console.warn("⚠️ No study materials found for class:", studentClass);
      throw new Error("No study materials found for this class");
    }
    return { success: true, data: materials };
  } catch (error) {
    console.error("❌ Error fetching study material:", error);
    throw new Error("Internal server error");
  }
}

module.exports = { fetchStudyMaterial };
