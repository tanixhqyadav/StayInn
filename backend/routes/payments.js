const express = require('express');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// ✅ Initialize Razorpay with Environment Variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ Create Order API
router.post('/orders', async (req, res) => {
    try {

        let { amount, currency } = req.body;
        if (!amount || !currency) {
            return res.status(400).json({ message: "Amount and currency are required" });
        }

        // Convert amount to paisa
        amount = parseInt(amount);

        const maxAmount = 1000000 * 100; // 1 million INR in paisa
        if (amount > maxAmount) {
            return res.status(400).json({ message: `Amount exceeds the allowed limit of ₹10,00,000` });
        }

        const options = {
            amount,
            currency,
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1
        };


        const order = await razorpay.orders.create(options);

        res.status(201).json({
            order_id: order.id,
            currency: order.currency,
            amount: order.amount
        });
    } catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
});



// ✅ Fetch Payment Details API
router.get('/payment/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await razorpay.payments.fetch(paymentId);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        });
    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).json({ message: "Failed to fetch payment" });
    }
});

module.exports = router;
