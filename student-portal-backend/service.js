const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();




// MongoDB Connection URI
const mongoURI = process.env.MONGO_URI 


async function getCollection(collectionName) {
    const client = new MongoClient(mongoURI);
    await client.connect();
    
    const database = client.db("student-portal-database");  
    const collection = database.collection(collectionName);
    
    return { collection, client }; 
}


async function fetchDataByMobile(mobNo) {
    const { collection, client } = await getCollection("student-portal");  
    try {
        const data = await collection.findOne({ mobNo: parseInt(mobNo) }); 

        if (!data) {
            return { error: "No student found with this mobile number" };
        }

        // Extract only required fields
        const extractedData = {
            "Roll no": data.rollNo,
            "Class": data.class,
            "Student's name": data.studentName,
            "Section": data.section,
            "Mother's Name": data.motherName,
            "School": data.ParentsWorkingschool,
            "Father's Name": data["father Name"],
            "School Code": data.schoolCode,
            "Mob No": data.mobNo,
            "City": data.city
        };

        return extractedData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { error: "Failed to fetch data" };
    } finally {
        await client.close();
    }
}



module.exports = { fetchDataByMobile};