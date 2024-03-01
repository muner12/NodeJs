const express=require('express');
const dotenv=require('dotenv').config();
const router=require("./routes/index");





const app=express();

app.use(express.json())
app.use("/api",router)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log('http://localhost:'+PORT);
});



