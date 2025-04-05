const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({}, { strict: false });
const Schools = mongoose.models.School || mongoose.model('School', schoolSchema, 'epoch-sample-data');

const studentSchema = new mongoose.Schema({}, { strict: false });
const Students = mongoose.models.Student || mongoose.model('Student', studentSchema, 'student-data');

module.exports = { Schools, Students };