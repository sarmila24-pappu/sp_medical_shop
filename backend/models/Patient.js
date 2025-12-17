const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
name: String,
contact: String,
email: String,
bills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }]
});
module.exports = mongoose.model('Patient', PatientSchema);