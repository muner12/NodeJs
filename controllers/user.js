
const path=require('path');
const fsPromiss=require('fs').promises
const bcrypt=require("bcrypt");
const { json } = require('express');



let usersDB={
    users:require("../modal/data/users.json"),
    setUsers:function(data){ this.users=data}
}


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
        
        let response={
            authorized:true,
            message:"User Loggined Successfully",
            username:foundUser.username
        }

        return  res.status(200).json(response);
    }else{
        return res.status(401).json( {"message":"Invalid Password or username"} );
    }



}


module.exports={registerUser,userLogin}