const path=require('path');
const fsPromiss=require('fs').promises

let usersDB={
    users:require("../modal/data/users.json"),
    setUsers:function(data){ this.users=data}
}

let handlLogout=async(req,res)=>{
   
    let cookies=req.cookies
   
    if(!cookies.jwt){
      
        return res.status(204);
    }

    const token=cookie.jwt;
    const foundUser=usersDB.users.find(person=>person.rershToken===token);
    if(!foundUser){
        res.clearCookie('jwt',{httpOnly:true});
        res.status(204);
    }

    //delete token form db

    let otherUser=usersDB.users.filter(person=>person.rershToken!==token);
    let currentUser={...foundUser,rershToken:''}

    usersDB.setUsers([...otherUser , currentUser]);
    await fsPromiss.writeFile(path.join(__dirname,'..','modal/data','users.json'),
    JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt',{httpOnly:true});
    res.status(204);

}
