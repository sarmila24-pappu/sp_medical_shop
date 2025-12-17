const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");

const adminRoutes = require("./routes/admin");
const Order = require("./models/Order"); // if you created Order model

dotenv.config();

// 🔹 INITIALIZE APP FIRST
const app = express();

// 🔹 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔹 ROUTES
app.use("/api/admin", adminRoutes);

// 🔹 RAZORPAY INSTANCE
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🔹 CREATE RAZORPAY ORDER
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Razorpay order failed" });
  }
});

// 🔹 SAVE BILL / ORDER (AFTER PAYMENT)
app.post("/api/orders/save", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Order save failed" });
  }
});

// 🔹 DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// 🔹 START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
