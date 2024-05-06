const express=require("express");
let authController=require('../controllers/authController');
const router=express.Router();




router.route('/register').post(authController.register);