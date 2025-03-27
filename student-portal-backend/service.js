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
        const data = await collection.findOne({
            "Mob No": { "": Number(mobNo) } 
        });

        if (!data || !data["Mob No"] || typeof data["Mob No"] !== "object") {
            console.error("No valid student data found for Mobile No:", mobNo);
            return { error: "No student found with this mobile number" };
        }
        const schoolData = await fetchSchoolData(data["School Code"]);
        const rollNoKey = Object.keys(data["Roll No"])[0];
        const extractedData = {
            "Roll No": data["Roll No"]?.[rollNoKey] || "Unknown",
            "Class": data["Class"],
            "Student's Name": data["Student Name"],
            "Section": data["Section"],
            "Mother's Name": data["Mother Name"],
            "Father's Name": data["Father Name"],
            "School Code": data["School Code"],
            "Mob No": mobNo,
            "City": schoolData ? schoolData["city"] : "Unknown",
            "State": schoolData ? schoolData["state"] : "Unknown",
            "Country": schoolData ? schoolData["country"] : "Unknown",
            "School": schoolData ? schoolData["schoolName"] : "Unknown"
        };
        return extractedData;

    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return { error: "Failed to fetch data", details: error.message };
    } finally {
        await client.close();
    }
}

async function fetchSchoolData(code) {
    const { collection, client } = await getCollection("epoch-sample-data");

    try {
        const schoolData = await collection.findOne({ "schoolCode": code });

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