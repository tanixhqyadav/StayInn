const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
// const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ email:user.email , id: user._id }, process.env.JWT_SECRET,{},(err,token)=>{
            if(err){
                console.error(err);
                return res.status(500).json({message:'Server Error'});
            }
            res.cookie('token', token).json(user);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;