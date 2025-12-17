import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    patient: String,
    doctor: String,
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

export default mongoose.model("Invoice", invoiceSchema);
