const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// GET all categories
router.get('/', messageController.getMessages);

// POST a new category
router.post('/', messageController.postMessage);

module.exports = router;
