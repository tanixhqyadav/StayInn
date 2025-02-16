const express = require('express');
const router = express.Router();
const Place = require('../models/placeModel');
const jwt = require('jsonwebtoken');

router.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const { id , 
        title, address, 
        description, photos, perks, 
        extraInfo, checkIn, checkOut, maxGuests, price
    } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        const placeDoc=await Place.findById(id);
        if(!placeDoc) return res.status(404).json({message:'Place not found'});
        if(placeDoc.owner.toString()===userData.id){
            placeDoc.set({
                title, address, description, photos, perks, extraInfo, checkIn, checkOut, maxGuests, price
            });
            await placeDoc.save();
            return res.status(200).json({message:'Place updated successfully'});
        }
        else{
            return res.status(401).json({message:'Unauthorized'});
        }
        
    });

});

module.exports = router;