const express=require('express');
const path=require('path');
const data={}
data.employees=require('../data/data.json');
const router=express.Router();

router.route('/').get((req,res)=>{
    
    res.json(data.employees);

}).post((req,res)=> {
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
    })
}).put((req,res)=>{
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
    })
}).delete((req,res)=>{
    res.json({"id":req.body.id});
});
