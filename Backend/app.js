const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/db");
const usersRoute = require("./routes/user.route");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
connectToDb();

app.get("/",(req,res)=>{
    res.send("or kese ho sab ");
})
app.use("/users",usersRoute);

module.exports =app;