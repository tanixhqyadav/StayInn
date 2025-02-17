const express = require('express');
const router = express.Router();
const Place = require('../models/placeModel');
const jwt = require('jsonwebtoken'); 


router.get('/user-places', (req, res) => { 
    const {token}=req.cookies;
    jwt.verify(token,process.env.JWT_SECRET,{},async(err,useData)=>{
        if(err){
            return res.status(401).json({message:'Unauthorized'});
        }
        const id=useData.id;
        res.json(await Place.find({owner:id}));
    })
});

module.exports = router;
