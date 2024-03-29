const express = require('express');
const router = express.Router();
const postController = require('../controllers/postCotroller');

// GET all posts or a specific post by ID
router.get('/', postController.getPosts);

// Add a new post
router.post('/', postController.addPost);

// Delete a post by ID
router.delete('/:id', postController.deletePost);

// Update a post by ID
router.put('/:id', postController.updatePost);

module.exports = router;
