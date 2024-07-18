const mongoose=require('mongoose');
const PersonSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    contact:{
        type:Number,
        require:true
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
        require:true
    }
})

const Person=mongoose.model('Person',PersonSchema);
module.exports={
    Person
}