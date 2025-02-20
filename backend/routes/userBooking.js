const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const jwt = require('jsonwebtoken');

const getUserData = (req) => {
    return new Promise((resolve, reject) => {
        const { token } = req.cookies;
        if (!token) {
            return reject({ status: 401, message: 'Unauthorized: No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
            if (err) {
                return reject({ status: 401, message: 'Unauthorized: Invalid token' });
            }
            resolve(userData);
        });
    });
};

router.post('/bookings', async (req, res) => {
    try {
        const userData = await getUserData(req);
        const { checkIn, checkOut, guests, name, phone, place, price } = req.body;

        const newBooking = await Booking.create({
            place,
            user: userData.id, 
            checkIn,
            checkOut,
            guests,
            name,
            phone,
            price
        });

        res.json(newBooking);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
});

router.get('/bookings', async (req, res) => {
    try {
        const userData = await getUserData(req);

        const bookings = await Booking.find({ user: userData.id }).populate('place');
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
});

module.exports = router;
