const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const User = require('../models/User');

exports.userRegister = async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

      // Get gravatar from email
        const avatar = gravatar.url(email, {
            size: "200",
            rating: "PG",
            default: "mm",
        });

      // Encrypt password
        const salt = await bcrypt.genSalt(12);
        const encryptedPassword = await bcrypt.hash(password, salt);

      // Build user object and save to database
        user = new User({
            name,
            email,
            password: encryptedPassword,
            avatar,
        });
        await user.save();

      // JWT logic
        const payload = {
            user: {
            id: user.id,
            },
        };
        jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: 3600},(err, token) => {
            if (err) throw err;
            res.json({ token });
            }
        );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("There was an error with the server. Try again later.");
        }
}