const mongoose = require('mongoose');
const MedicineSchema = new mongoose.Schema({
name: String,
company: String,
price: Number,
gst: Number,
sku: String,
stock: Number,
description: String
});
module.exports = mongoose.model('Medicine', MedicineSchema);