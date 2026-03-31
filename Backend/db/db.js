const mongoose = require("mongoose");

const connectToDb = async()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("db is connected"))
    .catch((err)=>console.log(err));
}

module.exports = connectToDb;