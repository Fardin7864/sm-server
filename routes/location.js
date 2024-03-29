const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// GET all locations or a specific location by ID
router.get('/', locationController.getLocations);

// Add a new location
router.post('/', locationController.addLocation);

// Delete a location by ID
router.delete('/:id', locationController.deleteLocation);

// Update a location by ID
router.put('/:id', locationController.updateLocation);

module.exports = router;
