const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect=require('./config/dbConnect')
const userRegister = require('./routes/userRegister');
const userLogin = require('./routes/userLogin');
const userProfile = require('./routes/userProfile');
const cookieParser = require('cookie-parser');
dotenv.config();
dbConnect();
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use(cookieParser());



app.use('/api', userRegister);
app.use('/api', userLogin);
app.use('/api',userProfile);




app.get('/', (req, res) => {
    res.send('Welcome to the basic backend!');
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});