const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt=require('jsonwebtoken');
router.get('/profile', async (req, res) => {
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async(err,decoded)=>{
            if(err){
                return res.status(401).json({message:'Unauthorized'});
            }
            const {name, email, _id}=await User.findById(decoded.id);
            res.json({name,email,_id});
        });
    }
}); 

module.exports = router;