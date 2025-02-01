const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);
router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
    const user=await User.create(
        {name, 
        email, 
        password:bcrypt.hashSync(password, bcryptSalt),
    });}
    catch(err){
        return res.status(422).json({message:err.message});
    }
    res.json(user);
});

module.exports = router;