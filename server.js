const express=require('express');
const app=express();
const db=require('./db');
const {router}=require('./Routes/personRoute');
const {passport}=require('./auth');
require('dotenv').config();


//Middle ware Function
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()} ]Request Made to : ${req.originalUrl}`);
    next(); 
}
//Authenticatioin with localStrategy
app.use(passport.initialize());
const localAuthMidddleware=passport.authenticate('local',{session:false});


app.get('/',localAuthMidddleware,(req,res)=>{
    res.send("welcome to hotel");
})

app.use('/person',logRequest,router);

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log("server is running at port Number 3000");
})