const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// GET all reports or a specific report by ID
router.get('/', reportController.getReports);

// Add a new report
router.post('/', reportController.addReport);

// Delete a report by ID
router.delete('/:id', reportController.deleteReport);

// Update a report by ID
router.put('/:id', reportController.updateReport);

module.exports = router;
