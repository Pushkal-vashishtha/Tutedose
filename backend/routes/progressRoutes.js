const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// Save progress
router.post('/progress', progressController.saveProgress);

// Get progress
router.get('/progress/:userId/:videoId', progressController.getProgress);

module.exports = router;