const bcrypt=require('bcrypt');
const data={
    employees:require('../modal/data/emplooye.json'),
    setEmployee:function(data){this.employees=data}
}



const getAllEmployes=(req,res)=>{
    
    res.json(data.employees);

}

const postEmployee=(req,res)=> {

    let newEmployee={
        id:data.employees?.length ?data.employees[data.employees.length-1].id+1 : 1 ,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }

    if(!req.body.firstname || !req.body.lastname){
        res.status(400).json({"message":"Both firstname and lastname is required"});
        return;
    }

   data.setEmployee([...data.employees,newEmployee]);

    res.status(201).json(newEmployee);



}


const updateEmployee=((req,res)=>{
    res.json({
        "firstname":req.body.firstname,
        "lastname":req.body.lastname
    })

});


const deleteEmployee=(req,res)=>{
    res.json({"id":req.body.id});
}




const getOneEmplyee=(req,res)=>{
    res.json({"id":req.params.id});
}






module.exports={
    getAllEmployes,
    postEmployee,
    getOneEmplyee,
    deleteEmployee,
    updateEmployee
}