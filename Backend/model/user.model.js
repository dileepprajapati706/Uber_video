const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'firstname is at least 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'lastname is at least 3 character long'],
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'email is at least 5 character long '],
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    }
})

userSchema.methods.genrateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.statics.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
const userModel = mongoose.model("user",userSchema);

module.exports = userModel;