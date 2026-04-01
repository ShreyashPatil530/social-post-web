const express = require('express');
const router = express.Router();
const { createPost, getFeed, likePost, commentOnPost } = require('../controllers/postController');
const { protect } = require('../middleware/auth');

router.get('/feed', getFeed); // Public
router.post('/create', protect, createPost);
router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentOnPost);

module.exports = router;
