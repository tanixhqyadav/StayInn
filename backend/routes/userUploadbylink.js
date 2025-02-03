const express = require('express');
const router = express.Router();
const imageDownloader = require('image-downloader');
const path = require('path');

router.post('/upload-by-link', async (req, res) => {
    try {
        const { link } = req.body;

        if (!link) {
            return res.status(400).json({ error: 'Image URL is required' });
        }

        const newName = 'photo' + Date.now() + '.jpg';
        const destPath = path.join(__dirname, '../uploads', newName);

        await imageDownloader.image({
            url: link,
            dest: destPath
        });

        res.json({fileName: newName });
    } catch (error) {
        res.status(500).json({ error: 'Image download failed', details: error.message });
    }
});

module.exports = router;
