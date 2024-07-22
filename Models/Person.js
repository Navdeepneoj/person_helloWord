const mongoose=require('mongoose');
const passport = require('passport');
const bcrypt=require('bcrypt');
const PersonSchema=new mongoose.Schema({
    name:{ 
        type:String,
        
    },
    contact:{
        type:Number,
        
    },
    Email:{
        type:String,
        require:true,
        unique:true
    },
    Flat_no:{
        type:Number,
    },
    flat_Type:{
        type:String,
        enum:["3bhk","2bhk","1bhk"],
        
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
//pre middleware which help to used hashed data with some salt
//next is a callback function

PersonSchema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password'))return next();
    try {
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await  bcrypt.hash(person.password,salt);
        person.password=hashedPassword;
        next();
    } catch (error) {
         return next(error);
    }
})

PersonSchema.methods.comparePassword=async function(candidatePassword){
    try {
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
        
    } catch (error) {
        throw error;
        
    }
}

const Person=mongoose.model('Person',PersonSchema);
module.exports={
    Person 
}