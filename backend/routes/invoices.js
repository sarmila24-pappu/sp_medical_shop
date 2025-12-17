import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();

// SAVE INVOICE
router.post("/save", async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.json({ success: true, invoice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL INVOICES
router.get("/", async (req, res) => {
  const invoices = await Invoice.find().sort({ createdAt: -1 });
  res.json(invoices);
});

export default router;
