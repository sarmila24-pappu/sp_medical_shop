require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Medicine = require('../models/Medicine');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const User = require('../models/User');
const shortid = require('shortid');


(async () => {
await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sp_medical');
console.log('connected');


// clear
await Medicine.deleteMany({});
await Doctor.deleteMany({});
await Patient.deleteMany({});
await User.deleteMany({});


// 10 medicines
const meds = [
{ name: 'Paracetamol 500mg', company: 'Acme Pharma', price: 50, gst: 12, sku: shortid.generate(), stock: 100 },
{ name: 'Azithromycin 250mg', company: 'Healwell', price: 120, gst: 12, sku: shortid.generate(), stock: 50 },
{ name: 'Cough Syrup 100ml', company: 'CurePlus', price: 85, gst: 5, sku: shortid.generate(), stock: 60 },
{ name: 'Vitamin C 500mg', company: 'NutriLife', price: 150, gst: 12, sku: shortid.generate(), stock: 80 },
{ name: 'Amoxicillin 500mg', company: 'PharmaTrust', price: 90, gst: 12, sku: shortid.generate(), stock: 70 },
{ name: 'Ibuprofen 200mg', company: 'ReliefCorp', price: 60, gst: 12, sku: shortid.generate(), stock: 90 },
{ name: 'Insulin 10ml', company: 'BioHeal', price: 450, gst: 5, sku: shortid.generate(), stock: 30 },
{ name: 'Metformin 500mg', company: 'GlucoCare', price: 70, gst: 5, sku: shortid.generate(), stock: 100 },
{ name: 'Antacid Tablet', company: 'DigestWell', price: 40, gst: 5, sku: shortid.generate(), stock: 120 },
{ name: 'Eye Drops', company: 'VisionX', price: 110, gst: 12, sku: shortid.generate(), stock: 40 }
];
await Medicine.insertMany(meds);
console.log('medicines seeded');


// 10 doctors
})();