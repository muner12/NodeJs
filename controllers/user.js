
const path=require('path');
const fsPromiss=require('fs').promises
const bcrypt=require("bcrypt");
const { json } = require('express');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();


let usersDB={
    users:require("../modal/data/users.json"),
    setUsers:function(data){ this.users=data}
}

//get All user controller

const getUsers=(req,res)=>{

    res.status(201).json(usersDB.users);
}


//register controller
const registerUser=async(req,res)=>{

    if(!req.body.username || !req.body.password){
        res.status(400).json( {"message":"username and password are required"} );
        return;
    }
    

    let {username,password}=req.body
    
    let duplucate=usersDB.users.find(person=> person.username=== username);
    if(duplucate){
        res.status(409).json({message:'user already exist'});
        return 
    }

    try {
        let hashedPassword=await bcrypt.hash(password,10);
        const newUser={
            username:username,
            password:hashedPassword
        }

        usersDB.setUsers([...usersDB.users,newUser]);

        await fsPromiss.writeFile(
            path.join(__dirname,'..','modal/data','users.json'),
            JSON.stringify(usersDB.users)
        )
        res.status(201).json({"message":`${username} created Successfully`})

    } catch (error) {
        console.log(error)
        res.status(500).json({"message":"Internal Server Error"})
    }

}

//login

let userLogin=async(req,res)=>{

    let {username,password}=req.body
    if(!username || !password) return res.status(401).json({"message":"username and password is required"});
    
    const foundUser=usersDB.users.find(person=>person.username===username);
    if(!foundUser) return res.status(401).json({"message":"Invalid Username"});

    const matchUser=await bcrypt.compare(password,foundUser.password);
    if(matchUser){
        let otherUser=usersDB.users.filter(person=>person.username!==foundUser.username);
        let accessToken=jwt.sign(
            {username:foundUser.username},
            process.env.ACCESS_TOKEN_SECRET_KEY,
            {expiresIn:"30s"});

            let rershToken=jwt.sign(
                {username:foundUser.username},
                process.env.REFRESH_TOKEN_SECRET_KEY,
                {expiresIn:"1d"})


        let currentUser={...foundUser,rershToken};
        usersDB.setUsers([...otherUser,currentUser]);

        await fsPromiss.writeFile(
            path.join(__dirname,'..','modal/data','users.json'),
            JSON.stringify(usersDB.users)
        )

        console.log(otherUser);
        let response={
            authorized:true,
            message:"User Loggined Successfully",
            username:foundUser.username,
           accessToken:accessToken
            
        }

        res.cookie('jwt',currentUser.rershToken,{httpOnly:true,maxAge:24*60*60*60*1000});

        return  res.status(200).json(response);
    }else{
        return res.status(401).json( {"message":"Invalid Password or username"} );
    }



}


//logout controller


//refreshToken Controller

let handleRefresh=(req,res)=>{
    const cookies=req.cookies
    if(!cookies.jwt) return  res.status(401).json({ "message": "You are not logged in!" });
    const refreshToken=cookies.jwt;
   let  foundUser=usersDB.users.find(person=>person.rershToken===refreshToken);
    if(!foundUser)return   res.status(401).json({ "message": "UnAuthorized User"});
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        (err,decode)=>{
            if(err || foundUser.username!==decode.username)return res.status(401).json({"message":"UnAuthorzied User"});
            const accessToken=jwt.sign(
                {username:decode.username},
                process.env.ACCESS_TOKEN_SECRET_KEY,
                {expiresIn:"30s"}
            )
            res.json({accessToken});
        }
        
    )

}


//logout Controller




module.exports={registerUser,userLogin,getUsers,handleRefresh}