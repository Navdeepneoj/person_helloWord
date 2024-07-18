const mongoose= require("mongoose");
require('dotenv').config();
const mongoUrl=process.env.DB_URL;
// const mongoUrl="mongodb://localhost:27017/FlatData";
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}) 

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("database is connected");
})

db.on('disconnected',()=>{
    console.log("database is disconnected");
})

db.on('error',()=>{
    console.log("error");
})

module.exports={
    db
}