const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {auth} = require('../middlewares/auth');
const {createPost, getPosts, getPostsByUserId, getPostsById, getPostsOfFollowingUsers, likePost, unlikePost, deletePostById, postComment, deleteComment} = require('../controllers/postController');
const {upload} = require('../middlewares/upload');

// @route:    POST api/posts
// @desc:     Create a post
// @access:   Private
router.post("/", 
    [
        auth,
        upload,
        [
        check("title", "Title is required").not().isEmpty(),
        check("techTags", "Atleast 1 tag is required").not().isEmpty(),
        check("websiteUrl", "Website URL is required").not().isEmpty(),
        check("websiteUrl", "Enter a valid URL").isURL(),
        ]
    ],
    createPost
);

// @route:    GET api/posts
// @desc:     Get all posts
// @access:   Private
router.get("/", auth, getPosts);

// @route:    GET api/posts/:post_id
// @desc:     Get post by ID
// @access:   Private
router.get("/:post_id", auth, getPostsById);

// @route:    GET api/posts/user/:user_id
// @desc:     Get all posts by an user
// @access:   Private
router.get("/user/:user_id", auth, getPostsByUserId);

// @route:    GET api/posts/feed
// @desc:     Get posts of following users
// @access:   Private
router.get("/feed", auth, getPostsOfFollowingUsers);

// @route:    PUT api/posts/like/:id
// @desc:     Like a post
// @access:   Private
router.put("/like/:id", auth, likePost);

// @route:    PUT api/posts/unlike/:id
// @desc:     Unlike a post
// @access:   Private
router.put("/unlike/:id", auth, unlikePost);

// @route:    DELETE api/posts/:post_id
// @desc:     Delete post by ID
// @access:   Private
router.delete("/:post_id", auth, deletePostById);

// @route:    POST api/post/comment/:post_id
// @desc:     Post a comment
// @access:   Private
router.post("/comment/:post_id",
    [
        auth, 
        [
        check("text", "Comment text is required").not().isEmpty()
        ]
    ],
    postComment
);

// @route:    DELETE api/post/comment/:post_id/:comment_id
// @desc:     Delete a comment
// @access:   Private
router.delete("/comment/:post_id/:comment_id", auth, deleteComment);



module.exports = router;