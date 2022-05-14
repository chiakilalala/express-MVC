const express = require('express');
const router = express.Router();
const PostController = require('../controller/posts');





router.get('/', PostController.getPost);

router.post('/',  PostController.creatPosts);
router.delete('/',  PostController.deletePost);

router.patch('/:id', PostController.patchPost);

router.delete('/:id',  PostController.deleteOnePost);

module.exports = router;
