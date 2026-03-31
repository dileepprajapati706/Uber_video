const userModel = require("../model/user.model");
const userServices = require("../services/user.services");
const {validationResult} = require("express-validator");

module.exports.registerUser = async(req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    const {fullname, email, password} = req.body;
    const hashPassword = await userModel.hashPassword(password);
    
    const user = await userServices.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword
    });
    const userObj = user.toObject();
    delete userObj.password;
    const token = user.genrateAuthToken();
    
    res.status(201).json({token,user:userObj})
}