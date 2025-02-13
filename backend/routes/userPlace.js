const express = require('express');
const router = express.Router();
const Place = require('../models/placeModel');
const jwt=require('jsonwebtoken');


router.post('/places', (req, res) => {
    const {token}=req.cookies;
    const {title, address, addedPhotos , description, perks, 
        extraInfo,checkIn, checkOut, maxGuests, price}=req.body;
    jwt.verify(token,process.env.JWT_SECRET,async(err,decoded)=>{
        if(err){
            return res.status(401).json({message:'Unauthorized'});
        }
        const placeDoc=Place.create({
            owner:decoded.id,
            title, 
            address, 
            addedPhotos , 
            description, 
            perks, 
            extraInfo,
            checkIn, 
            checkOut, 
            maxGuests, 
            price
        });
        res.status(201).json({message:'Place created successfully'});
    });
});















module.exports = router;