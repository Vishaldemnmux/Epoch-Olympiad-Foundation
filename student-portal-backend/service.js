require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoURI = process.env.MONGO_URI 
const dbName = process.env.DATABASE_NAME



async function getCollection(collectionName) {
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const database = client.db(dbName);  
    const collection = database.collection(collectionName);
    
    return { collection, client }; 
}


async function fetchDataByMobile(mobNo) {

    const { collection, client } = await getCollection("student-data");

    try {
        mobNo = mobNo.toString();
        const query = { "Mob No": { "": mobNo } };
        const data = await collection.findOne(query);

        if (!data) {
            console.warn("⚠ No student found for Mobile No:", mobNo);
            return { error: "No student found with this mobile number" };
        }

        const rollNoKey = Object.keys(data["Roll No"])[0];  
        const rollNo = data["Roll No"][rollNoKey];         

        const mobNoKey = Object.keys(data["Mob No"])[0];
        const extractedMobNo = data["Mob No"][mobNoKey];   

        const schoolData = await fetchSchoolData(data["School Code"]);

        const extractedData = {
            "Roll No": rollNo,
            "Class": data?.["Class".trim()]?.trim() || "Unknown",                      
            "Student's Name": data?.["Student Name".trim()]?.trim() || "Unknown", 
            "Section": data["Section"],
            "Mother's Name": data["Mother Name"],
            "Father's Name": data["Father Name"],
            "School Code": data["School Code"],
            "Mob No": extractedMobNo,
            "IAOL Basic" : data["IAOL1"],
            "IAOL Advance" : data["IAOL2"],
            "IITSTL Basic" : data["ITSTL1"],
            "ITSTL Advance" : data["ITSTL2"],
            "IIMOL Basic" : data["IMOL1"],
            "IMOL Advance" : data["IMOL2"],
            "IENGOL Basic" : data["IENGOL1"],
            "IENGOL Advance" : data["IENGOL2"],
            "IGKOL Basic" : data["IGKOL1"],
            // "IGKOL Advance" : data["IGKOL2"],
            "Total Basic Level Participated Exams" : data["Total Basic Level Participated Exams"],
            "Basic Level Full Amount" : data["Basic Level Full Amount"],
            "Basic Level Paid Amount" : data["Basic Level Paid Amount"],
            "Basic Level Amount Paid Online" : data["Basic Level Amount Paid Online"],
            "Is Basic Level Concession Given" : data["Is Basic Level Concession Given"],
            "Concession Reason" : data["Concession Reason"],
            "Advance Level Paid Amount" : data["Advance Level Paid Amount"],
            "Advance Level Amount Paid Online" : data["Advance Level Amount Paid Online"],
            "Total Amount Paid" : data["Total Amount Paid"],
            "Total Amount Paid Online" : data["Total Amount Paid Online"],   
            "City": schoolData?.["City".trim()]?.trim() || "Unknown",   
            "Country": schoolData?.Country?.trim() || "Unknown",
            "School": schoolData?.["School Name"]?.trim() || "Unknown",
            "Exam Centre": schoolData?.examCenterLevel1?.trim() || "Unknown"
        };
        return extractedData;

    } catch (error) {
        console.error("❌ Error fetching data from MongoDB:", error);
        return { error: "Failed to fetch data", details: error.message };
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
    } 
}




module.exports = { fetchDataByMobile };