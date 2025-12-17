const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');


const instance = new Razorpay({
key_id: process.env.RAZORPAY_KEY_ID,
key_secret: process.env.RAZORPAY_KEY_SECRET
});


// create order
// frontend should POST { amount, currency, receipt, notes }
router.post('/create-order', async (req, res) => {
const { amount, currency = 'INR', receipt } = req.body; // amount in paise
try {
const order = await instance.orders.create({ amount, currency, receipt });
res.json(order);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'order creation failed' });
}
});


module.exports = router;