const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if(!token){
        return res.status(401).json({message:"Unauthorizes"});
    }

    try{console.log("token",token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        const user = await userModel.findById(decoded._id);
      
        if(!user){
            return res.status(401).json({message:"Unauthorizes"});
        }
        req.user = user;

        return next();

    }catch(err){
        res.status(401).json({message:"Unauthorizes user"});
    }
}