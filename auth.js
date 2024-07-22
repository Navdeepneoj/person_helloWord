const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const {Person}=require('./Models/Person');



passport.use(new localStrategy(async(username,password,done)=>{
    try{
        
          const user = await Person.findOne({username});
          if(!user){
            return done(null,false,{message:"username is invalid"});
          }
          const isPasswordMatch= await user.comparePassword(password);
          if(isPasswordMatch){
            return done(null,user);
          }
          else{
            return done(null,false,{message:"Invalid password"});
          }
        
    } 
    catch (error) {
        return done(error);
        
    }
}))

module.exports={
    passport
}