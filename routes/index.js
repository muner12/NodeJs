const express=require('express');
const {getAllEmployes,getOneEmplyee,updateEmployee,deleteEmployee,postEmployee}=require("../controllers/employee.js");
const {registerUser,userLogin}=require("../controllers/user.js");
const router=express.Router();

router.route('/')
      .get(getAllEmployes)
      .post(postEmployee)
      .put(updateEmployee)
      .delete(deleteEmployee);

router.route("/:id").get(getOneEmplyee)


router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
module.exports=router;