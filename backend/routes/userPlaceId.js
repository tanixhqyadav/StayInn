const express = require('express');
const router = express.Router();
const Place = require('../models/placeModel');

router.get('/places/:id', async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json(place);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }    });

module.exports = router;