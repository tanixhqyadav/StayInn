const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt=require('jsonwebtoken');

router.post('/logout', async (req, res) => {
    res.cookie('token' ,'').json(true);
});

module.exports = router;