require("dotenv").config();
const { MongoClient } = require("mongodb");

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DATABASE_NAME;

async function getCollection(collectionName) {
  const client = new MongoClient(mongoURI);
  await client.connect();
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  return { collection, client };
}

async function fetchDataByMobile(mobNo) {
  const { collection, client } = await getCollection("student_data_latests");

  try {
    mobNo = mobNo.toString();

    const data = await collection.findOne({ mobNo });

    if (!data) {
      console.warn("⚠ No student found for Mobile No:", mobNo);
      return { error: "No student found with this mobile number" };
    }

    const schoolData = await fetchSchoolData(data.schoolCode.toString());

    const extractedData = {
      "Roll No": data.rollNo || "Unknown",
      Duplicates: data.Duplicates !== undefined ? data.Duplicates : false,
      "School Code": data.schoolCode || "",
      Class: data.class?.trim() || "Unknown",
      Section: data.section || "Unknown",
      "Student's Name": data.studentName?.trim() || "Unknown",
      "Mother's Name": data.motherName || "",
      "Father's Name": data.fatherName || "",
      DOB: data.dob || "",
      "Mob No": data.mobNo || "",
      "IAOL Basic": data.IAOL1 !== undefined ? data.IAOL1 : "0",
      "IAOL Basic Book": data.IAOL1Book !== undefined ? data.IAOL1Book : "0",
      "IITSTL Basic": data.ITSTL1 !== undefined ? data.ITSTL1 : "0",
      "IITSTL Basic Book":
        data.ITSTL1Book !== undefined ? data.ITSTL1Book : "0",
      "IIMOL Basic": data.IMOL1 !== undefined ? data.IMOL1 : "0",
      "IIMOL Basic Book": data.IMOL1Book !== undefined ? data.IMOL1Book : "0",
      "IGKOL Basic": data.IGKOL1 !== undefined ? data.IGKOL1 : "0",
      "IGKOL Basic Book": data.IGKOL1Book !== undefined ? data.IGKOL1Book : "0",
      "Total Basic Level Participated Exams":
        data.totalBasicLevelParticipatedExams !== undefined
          ? data.totalBasicLevelParticipatedExams
          : "0",
      "Basic Level Full Amount":
        data.basicLevelFullAmount !== undefined
          ? data.basicLevelFullAmount
          : "0",
      "Basic Level Paid Amount":
        data.basicLevelAmountPaid !== undefined
          ? data.basicLevelAmountPaid
          : "0",
      "Basic Level Amount Paid Online":
        data.basicLevelAmountPaidOnline !== undefined
          ? data.basicLevelAmountPaidOnline
          : "",
      "Is Basic Level Concession Given": data.isBasicLevelConcessionGiven || "",
      "Concession Reason": data.concessionReason || "",
      Remark: data.remark || "",
      "Parents Working School": data.ParentsWorkingschool || "",
      Designation: data.designation || "",
      City: data.city || "",
      "Book Status": data.bookStatus || "",
      "IAOL Advance": data.IAOL2 !== undefined ? data.IAOL2 : "0",
      "IITSTL Advance": data.ITSTL2 !== undefined ? data.ITSTL2 : "0",
      "IIMOL Advance": data.IMOL2 !== undefined ? data.IMOL2 : "0",
      "Advance Level Paid Amount": data.advanceLevelAmountPaid || "",
      "Advance Level Amount Paid Online":
        data.advanceLevelAmountPaidOnline || "",
      "Total Amount Paid": data.totalAmountPaid || "",
      "Total Amount Paid Online": data.totalAmountPaidOnline || "",
      // School data fields (unchanged)
      "School City": schoolData?.City?.trim() || "Unknown",
      Country: schoolData?.Country?.trim() || "Unknown",
      School: schoolData?.["School Name"]?.trim() || "Unknown",
      "Exam Centre": schoolData?.examCenterLevel1?.trim() || "Unknown",
      Area: schoolData?.Area?.trim() || "Unknown",
    };

    return extractedData;
  } catch (error) {
    console.error("❌ Error fetching data from MongoDB:", error);
    return { error: "Failed to fetch data", details: error.message };
  } finally {
    await client.close();
  }
}
async function fetchSchoolData(code) {
  const { collection, client } = await getCollection("epoch-sample-data");

  try {
    const schoolData = await collection.findOne({ "School Code": code });

    if (!schoolData) {
      console.error("No school found for School Code:", code);
      return { error: "No school found with this code" };
    }
    return schoolData;
  } catch (error) {
    console.error("Error fetching school data:", error);
    return { error: "Failed to fetch school data", details: error.message };
  } finally {
    await client.close();
  }
}

module.exports = { fetchDataByMobile };
