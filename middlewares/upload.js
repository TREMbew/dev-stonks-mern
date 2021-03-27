/*const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, './images')
    },
    filename:  (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

exports.upload = multer({ 
    storage: storage,
    fileFilter: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        let errMsg;
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            errMsg = 'Only images are allowed'
            req.fileValidationError = errMsg;
            return callback(null, false, new Error(errMsg));
        }
        callback(null, true)
    }
}).array("postImage", 5);*/


const multer = require("multer");
require('dotenv').config()
const cloudinary = require("cloudinary").v2;
const path = require("path")
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
    },
});

exports.upload = multer({ 
    storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        var errMsg;
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            errMsg = 'Only images are allowed'
            req.fileValidationError = errMsg;
            return callback(null, false, new Error(errMsg));
        }
        callback(null, true)
    }}).array("postImage", 5);

