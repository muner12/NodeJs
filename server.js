const express=require('express');
const dotenv=require('dotenv').config();
const router=require("./routes/index");
const cookieParser=require('cookie-parser');




const app=express();

app.use(express.json())

app.use(cookieParser());

app.use("/api",router)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log('http://localhost:'+PORT);
});



