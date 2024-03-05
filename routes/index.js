const express=require('express');
//const {getAllEmployes,getOneEmplyee,updateEmployee,deleteEmployee,postEmployee}=require("../controllers/employee.js");
const {registerUser,userLogin,getUsers, handleRefresh, handlLogout}=require("../controllers/user.js");
const verifyJWT=require('../middleware/verifyJWT.js');
const router=express.Router();

// router.route('/')
//       .get(getAllEmployes)
//       .post(postEmployee)
//       .put(updateEmployee)
//       .delete(deleteEmployee);

// router.route("/:id").get(getOneEmplyee)

router.route('/users').get(verifyJWT,getUsers);
router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/refresh').get(handleRefresh);
//router.route('/logout').get(handlLogout);
module.exports=router;