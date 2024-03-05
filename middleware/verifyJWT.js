const dotenv=require('dotenv').config();
const jwt=require('jsonwebtoken');
const verifyJWT=(req,res,next)=>{
    console.log(req.headers)
    const authHeader=req.headers['authorization'];
    if (!authHeader) return  res.status(401).json({"message":"Not Authorized User"});

    const token=authHeader.split(' ')[1];
    console.log(token);
    console.log(process.env.ACCESS_TOKEN_SECRET_KEY)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,decoder)=>{
        if(err) return res.status(401).json({"message":"Not Authorized User"});
        req.user=decoder.username
        next();
    })

}

module.exports=verifyJWT