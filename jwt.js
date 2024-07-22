const jwt=require('jsonwebtoken');

//this is for token abstact from header and verfied before reaching to server
const jwtMiddleWare=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:"unauthorizaton"});

    try 
    {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userPayLoad=decoded;//This is basically do when we verfiied the token is send payload that is tored inside tha token and we saved this payload and use them to find tha data from database .This payload store tha some information about the username like password,userId etc.
        next();
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({error:"Invalid Token"});
    }
    
}

//function to generate the token

const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}
module.exports={
    jwtMiddleWare,
    generateToken
}