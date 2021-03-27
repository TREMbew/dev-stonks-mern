const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {userRegister} = require('../controllers/userController')

// @route:  POST /api/users
// @desc:   Register an user
// @access: Public
router.post(
    "/",
    [
        check("name", "Name is a required field").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password","Please enter a password with 6 or more characters").isLength({ min: 6 }),
    ],
    userRegister
);

module.exports = router;