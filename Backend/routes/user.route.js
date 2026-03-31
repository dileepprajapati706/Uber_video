const express = require("express");
const {body} = require("express-validator");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authmiddleware = require("../middlewares/user.middleware");

router.post("/register",[
    body('email').isEmail().withMessage('invalid Email !'),
    body('fullname.firstname').isLength({min:3}).withMessage("first name length at least 3 character"),
    body('password').isLength({min:6}).withMessage('password must be 6 character')
],
userController.registerUser
)

router.post("/login",[
    body('email').isEmail().withMessage('invalid Email !'),
    body('password').isLength({min:6}).withMessage('password must be 6 character'),
],userController.loginUser)

router.get("/profile",authmiddleware.authUser,userController.getProfile)
module.exports = router ;