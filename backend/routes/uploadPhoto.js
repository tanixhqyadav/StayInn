const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', upload.array('photos',100) ,(req, res) => {
    console.log(req.files)
})

module.exports = router;