const express=require('express');
const bodyParser=require("body-parser");
const router=express.Router();
const {Person}=require('../Models/Person');
router.use(bodyParser.json());


router.get('/',async(req,res)=>{
    try {
        const data= await Person.find();
        res.status(200).json(data);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"});        
    }
})

router.post('/',async(req,res)=>{
    try {
        const data=req.body;
        const newPerson=new Person(data);
        const response= await newPerson.save();
        res.status(200).json(response);
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({error:"server side error"});
    
    }
})

router.get('/:flatType',async(req,res)=>{
    try
    {
        const flatType=req.params.flatType;
        if(flatType=="1bhk"|| flatType=="2bhk"|| flatType=="3bhk")
        {
            const data= await Person.find({flat_Type:flatType});
            res.status(200).json(data);
        }
        else
        {
            res.status(404).json({error:"not a valid input"});
        }
    } 
    catch (error)
    {
        console.log(error);
        res.status(500).json({error:"internal server error"});
    }
})

router.put('/:userId',async(req,res)=>{
    try{
        const userid=req.params.userId;
        const data=req.body;
        const response= await Person.findByIdAndUpdate(userid,data,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({error:"invalid userId"});
        }
        res.status(200).json(response);
    } 
    catch (error) 
    {
         console.log(error);
         res.status(500).json({error:"internal server error"});
    }
})

router.delete('/:userid',async(req,res)=>{
    try
    {
        const userId=req.params.userid;
        const response= await Person.findByIdAndDelete(userId);
        if(!response){
            return res.status(404).json({error:"server side error"});
        }
        console.log("data is deleted");
        res.status(200).json(response);
    } 
    catch (error)
    {
        console.log(error);
        res.status(500).json({error:"server side error"});
    
    }
})



module.exports={
    router
}