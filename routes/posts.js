const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts')

router.get('/', (req, res, next) => { posts.getData(req, res) });
router.post('/', (req, res, next) => { posts.createPost(req, res) })
router.patch('/:id', (req, res, next) => { posts.updatePost(req, res) })
router.patch('/:id/like', (req, res, next) => { posts.likePost(req, res) })
router.delete('/:id', (req, res, next) => { posts.deletePost(req, res) })

module.exports = router;
