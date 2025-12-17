const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    patientName: String,
    doctorName: String,
    email: String,
    contact: String,

    items: [
      {
        name: String,
        price: Number,
        qty: Number,
        total: Number,
      },
    ],

    grandTotal: Number,
    paymentId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
