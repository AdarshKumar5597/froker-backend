const express = require('express');
const router = express.Router();
const blogControllers = require('../controllers/blogController');


router.get('/blogs', blogControllers.getBlogs);
router.get('/blogs/:id', blogControllers.getBlogById);
router.post('/blogs/:id/like', blogControllers.addLikesOfBlogById);
router.delete('/blogs/:id/like', blogControllers.deleteLikesOfBlogById);
router.get('/blogs/popular/first-three', blogControllers.getFirstThreePopularBlogs);
router.post('/blogs', blogControllers.addBlog);
router.get('/popular', blogControllers.getPopularPosts);
router.post('/manyblogs', blogControllers.addManyBlogs);

module.exports = router;
