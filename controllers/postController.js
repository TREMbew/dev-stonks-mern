const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require("../models/Profile");

exports.createPost = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if(req.fileValidationError) errors.errors.push({msg:req.fileValidationError});
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Create post object
        const { title, description, techTags, websiteUrl, repoUrl } = req.body;
        const newPost = {};
        newPost.user = req.user.id;
        if (title) newPost.title = title;
        if (description) newPost.description = description;
        if (websiteUrl) newPost.websiteUrl = websiteUrl;
        if (repoUrl) newPost.repoUrl = repoUrl;

        // Get only links from the file object
        if (req.files) {
            newPost.images = req.files.map((image) => image.path);
        }

        // Split comma seperated tags into individual tags
        if (techTags) {
            newPost.techTags = techTags.split(",").map((tag) => tag.trim());
        }

        const post = new Post(newPost);
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
            res.status(500).send("There was an issue with the server. Try again later.");
        }
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ date: -1 })
            .populate("user", ["name", "avatar"]);
        res.json(posts);
    } catch (err) {
        res.status(500).send("There was an issue with the server. Try again later.");
        }
}

exports.getPostsByUserId = async (req, res) => {
    try {
        const posts = await Post.find({
            user: req.params.user_id,
        }).populate("user", ["name", "avatar"]);
        if (!posts) {
            return res.status(400).json({ msg: "No posts found" });
        }
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("There was an issue with the server. Try again later.");
    }
}

exports.getPostsById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id)
            .populate("user", ["name", "avatar"])
            .populate("likes.user", ["name", "avatar"])
            .populate("comments.user", ["name", "avatar"]);

      // If there's no such post
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("There was an issue with the server. Try again later.");
    }
}

exports.getPostsOfFollowingUsers = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        

      // Create an array of user ids of following
        const following = profile.following.map((following) => following.user._id);

      // Get posts of following users
        const posts = await Post.find({ user: { $in: following } })
            .sort("-date")
            .populate("user", ["name", "avatar"]);

        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send("There was an issue with the server. Try again later.");
    }
}

/**************************************************************************************************************/
//!!!!!!! TRY GET FOLLOWERS POSTS BEFORE !!!!!!!!! (register new users and add posts to test its functionality)/
//!!!!!!!!!!! SOMETHING WRONG WITH IT !!!!!!!!!!!!
/**************************************************************************************************************/

exports.likePost = async (req, res) => {
    try {   
        const post = await Post.findById(req.params.id);
        // Check if post is already liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id).length >
            0
        ) {
            return res.status(400).json({ msg: "Post already liked" });
        }
        // Add to likes array
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
            console.error(err.message);
            res.status(500).send("There was an issue with the server. Try again later.");
        }
}

exports.unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post exists
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // Check if post has been liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
            .length === 0
        ) {
            return res.status(400).json({ msg: "Post has not been liked yet" });
        }

        // Get remove index
        const removeIndex = post.likes
            .map((like) => like.user.toString())
            indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
            res.status(500).send("There was an issue with the server. Try again later.");
    }
}

exports.deletePostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

      // If there's no such post
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

      // Check ownership of post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        await post.remove();
        res.json({ msg: "Post deleted" });
    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            console.log(err)
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("There was an issue with the server. Try again later.");
    }
}

exports.postComment = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const post = await Post.findById(req.params.post_id);
        const user = await User.findById(req.user.id).select("name avatar");

        const newComment = {
            name: user.name,
            avatar: user.avatar,
            text: req.body.text,
            userId: req.user.id,
        };
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("There was an issue with the server. Try again later.");
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

      // Check if comment exists
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );
        if (!comment) {
            return res.status(404).json({ msg: "Comment does not exist" });
        }

      // Check if comment is posted by the same user
        if (comment.userId !== req.user.id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

      // Remove comment
        const removeIndex = post.comments
            .map((comment) => comment.userId)
            .indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}