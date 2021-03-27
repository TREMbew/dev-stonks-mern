const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const {auth} = require('../middlewares/auth');
const {createOrUpdateProfile, getMyProfile, getAllProfiles, getProfileByUserId, deleteUserAndProfile, followUser, unfollowUser} = require('../controllers/profileController');

// @route:    POST /api/profile
// @desc:     Create or update profile
// @access:   Private
router.post("/",
    [
        auth,
        [
        check("bio", "Bio is required").not().isEmpty(),
        check("skills", "Skills are required").not().isEmpty(),
        ],
    ],
    createOrUpdateProfile
);

// @route:    GET api/profile/me
// @desc:     Get current user's profile
// @access:   Private
router.get("/me", auth, getMyProfile);

// @route:    GET /api/profile
// @desc:     Get all profiles
// @access:   Public
router.get("/", getAllProfiles);

// @route:    GET api/profile/user/:user_id
// @desc:     Get profile by user ID
// @access:   Public
router.get("/user/:user_id", getProfileByUserId);

// @route:    DELETE api/profile
// @desc:     Delete user and profile
// @access:   Private
router.delete("/", auth, deleteUserAndProfile);

// @route:    PUT api/profile/follow/:user_id
// @desc:     Follow an user
// @access:   Private
router.put("/follow/:user_id", auth, followUser);

// @route:    PUT api/profile/unfollow/:user_id
// @desc:     Unfollow an user
// @access:   Private
router.put("/unfollow/:user_id", auth, unfollowUser);



module.exports = router;