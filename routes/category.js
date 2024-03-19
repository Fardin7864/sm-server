const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET all categories
router.get('/', categoryController.getCategories);

// POST a new category
router.post('/add', categoryController.addCategory);

// DELETE a category by ID
router.delete('/delete/:id', categoryController.deleteCategory);

// PUT update a category by ID
router.patch('/update/:id', categoryController.updateCategory);

module.exports = router;
