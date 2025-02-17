const express = require('express');
const router = express.Router();
const Place = require('../models/placeModel');

router.get('/places', async (req, res) => {
    res.json(await Place.find({}));
});


module.exports = router;