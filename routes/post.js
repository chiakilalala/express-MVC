const express = require('express');
const router = express.Router();
const PostController = require('../controller/posts');





router.get('/posts', PostController.getPost);

router.post('/post/',  PostController.creatPosts);

router.patch('/post/:id', PostController.patchPost);

router.delete('/posts',  PostController.deletePost);

router.delete('/post/:id',  PostController.deleteOnePost);

module.exports = router;




