const userModel = require("../model/user.model");
const userServices = require("../services/user.services");
const blacklistTokenModel = require("../model/blacklistToken.model");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const hashPassword = await userModel.hashPassword(password);

    const user = await userServices.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });
    const userObj = user.toObject();
    delete userObj.password;
    const token = user.genrateAuthToken();

    res.status(201).json({ token, user: userObj })
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "invalid email or password" });
    }
    const token = user.genrateAuthToken();
    const userObj = user.toObject();
    delete userObj.password;
    res.cookie('token',token);
    res.status(200).json({ token, user: userObj });
}

module.exports.getProfile = async (req, res, next)=>{
    res.status(200).json({user:req.user});
}

module.exports.logoutUser = async (req, res, next)=>{
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blacklistTokenModel.create({token});
    res.status(200).json({message:"Logout successfully"});

}