const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const User = require('../models/User');

exports.load = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("There was an error with the server. Try again later.");
    }
};

exports.login = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if user exists
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials : you must register" });
        }

        // If exists, check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials : wrong password" });
        }

        // Return jwt
        const payload = {
            user: {
            id: user.id,
            },
        };
        jwt.sign(payload,
            process.env.JWT_SECRET,{expiresIn: 3600},(err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("There was an error with the server. Try again later.");
        }
}