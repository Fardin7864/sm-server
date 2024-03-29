const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

// GET all promotions or a specific promotion by ID
router.get('/', promotionController.getPromotions);

// Add a new promotion
router.post('/', promotionController.addPromotion);

// Delete a promotion by ID
router.delete('/:id', promotionController.deletePromotion);

// Update a promotion by ID
router.put('/:id', promotionController.updatePromotion);

module.exports = router;
