const express = require('express');
const router = express.Router();
const Place = require('../models/placeModel');
const jwt = require('jsonwebtoken');

router.post('/places', async (req, res) => {
    const { token } = req.cookies;

    // Validate token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });

        // Destructure request body
        const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;

        // Validate inputs
        if (!title || !address || !description || !checkIn || !checkOut || !maxGuests || !price) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        try {
            const placeDoc = await Place.create({
                owner: decoded.id,
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests, price
            });
            res.status(201).json({ message: 'Place created successfully', place: placeDoc });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
});

module.exports = router;
