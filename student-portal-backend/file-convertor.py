import pandas as pd
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb+srv://your_username:your_password@your_cluster.mongodb.net/?retryWrites=true&w=majority")
db = client["your_database_name"]  # Change to your DB name
collection = db["your_collection_name"]  # Change to your Collection name

# Corrected Excel file path
excel_file = r"C:\Users\91870\Desktop\Student-portal-project\Student-Portal.xlsx"

# Read the Excel file
df = pd.read_excel(excel_file)

# Convert DataFrame to dictionary
data = df.to_dict(orient="records")

# Insert into MongoDB
collection.insert_many(data)

print("Excel converted to CSV successfully!")

print("Data inserted into MongoDB successfully!")
