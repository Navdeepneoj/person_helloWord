const express=require('express');
const app=express();
const db=require('./db');
const {router}=require('./Routes/personRoute');
require('dotenv').config();

app.use('/person',router);

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log("server is running at port Number 3000");
})