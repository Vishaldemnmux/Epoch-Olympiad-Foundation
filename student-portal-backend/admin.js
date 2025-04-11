const mongoose = require('mongoose');

// Admin Schema
const adminSchema = new mongoose.Schema(
    {
    email: { 
        type: String, 
        required: true, 
        unique: true,
    },
    password: { 
        type: String, 
        required: true,
        unique: true,
    }
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema, "admin-db");

module.exports = { Admin };
