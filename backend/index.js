const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const dbConnect=require('./config/dbConnect')
const userRegister = require('./routes/userRegister');
const userLogin = require('./routes/userLogin');
const userProfile = require('./routes/userProfile');
const cookieParser = require('cookie-parser');
const userLogout = require('./routes/userLogout');
const userUploadbylink = require('./routes/userUploadbylink');
const uploadPhoto=require('./routes/uploadPhoto');
const userPlace=require('./routes/userPlace');
const placesShow=require('./routes/getplaces');
const placeId=require('./routes/userPlaceId');
const UpdatePlace=require('./routes/updatePlace');
const allPlaces = require('./routes/allPlaces');
const userBooking=require('./routes/userBooking')
dotenv.config();
dbConnect();
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(express.json());
app.use(cookieParser());



app.use('/api', userRegister);
app.use('/api', userLogin);
app.use('/api',userProfile);
app.use('/api',userLogout);
app.use('/api',userUploadbylink);
app.use('/api',uploadPhoto);
app.use('/api',userPlace);
app.use('/api',placesShow);
app.use('/api',placeId);
app.use('/api',UpdatePlace);
app.use('/api',allPlaces);
app.use('/api',userBooking);





app.get('/', (req, res) => {
    res.send('Welcome to the basic backend!');
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});