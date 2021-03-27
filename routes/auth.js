const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {auth} = require('../middlewares/auth');
const {login, load} = require('../controllers/authController');

// @route:  GET api/auth
// @desc:   Load a connected user's info
// @access: Private
router.get("/", auth, load);

// @route:  POST api/auth
// @desc:   Logs in an user
// @access: Public
router.post("/",
    [
        check("email", "Email is required").not().isEmpty(),
        check("password", "Password is required").not().isEmpty(),
    ],
    login
);

module.exports = router;
