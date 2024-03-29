const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// GET all notifications or a specific notification by ID
router.get('/', notificationController.getNotifications);

// Add a new notification
router.post('/', notificationController.addNotification);

// Delete a notification by ID
router.delete('/:id', notificationController.deleteNotification);

// Update a notification by ID
router.put('/:id', notificationController.updateNotification);

module.exports = router;
