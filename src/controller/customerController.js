const customerModel = require('../Model/customerModel');
const {isValid,isValidBody,nameRegex,emailRegex,validMobile,dateRgx} = require('../middleware/validation');
const {v4:uuidv4}=require('uuid');


const createCustomerModel=async function(req,res){
    try{
    let body=req.body;
    let {firstName,lastName,mobileNumber,DOB,emailID,address,status}=body;
    if(!isValidBody(body)) return res.status(400).send({message:'No request was made'})

    if(!isValid(firstName)) return res.status(400).send({message:'first name required'})
    if(!nameRegex.test(firstName)) return res.status(400).send({message:'first name is not in format'})

    if(!isValid(lastName)) return res.status(400).send({message:'last name required'})
    if(!nameRegex.test(lastName)) return res.status(400).send({message:'last name is not in format'})

    if(!isValid(mobileNumber)) return res.status(400).send({message:'mobile number is required'})
    if(!validMobile.test(mobileNumber)) return res.status(400).send({message:'mobile number invalid'})

    if(!isValid(DOB)) return res.status(400).send({message:'Date Of Birth required'})
    if(!dateRgx.test(DOB)) return res.status(400).send({message:'Please provide valid date in this formate YYYY-MM-DD'})

    //*email validation
    if(!isValid(emailID)) return res.status(400).send({message:'email is required'})
    if(!emailRegex.test(emailID)) return res.status(400).send({message:'email is invalid'})
    let existEmail= await customerModel.findOne({emailID})
    if(existEmail) return res.status(400).send({message:'email already exists'})

    if(!isValid(address)) return res.status(400).send({message:"Address is required"})


    if(!isValid(status)) return res.status(400).send({message:"Customer status is required"})
    if(!['ACTIVE','INACTIVE'].includes(status)) return res.status(400).send({message:'You have to give ACTIVE or INACTIVE status'})    

    let create=await customerModel.create(body)
    res.status(200).send({data:create})
}catch(err){
    return res.status(500).send({ message: "Server side Errors. Please try again later", error: error.message })
}
}

const getList=async function (req,res){
    try{
    let q=req.query;
    let filter={
        status:'ACTIVE'
    }
    const data=await customerModel.find(filter).select({__v:0});
    if(data.length==0) return res.status(400).send({status:false,msg:'No data found'});
    return res.status(200).send({status:true,msg:'customer list',data:data});
    }catch(err){
        return res.status(500).send({ message: "Server side Errors. Please try again later", error: error.message })
    }
}
const deleteCustomer=async function (req,res){
    try{
    let q=req.params.userId;
    let findCustomer=await customerModel.findById({_id:q})
    if(!findCustomer) return res.status(400).send({status:false,msg:'Customer not found'});

    let customer = await customerModel.deleteOne({_id:q});
    if(!customer) return res.status(400).send({status:false,msg:'Customer not found'});

    return res.status(200).send({stutus:true,msg:'Customer deleted from list'});
}catch(err){
    return res.status(500).send({ message: "Server side Errors. Please try again later", error: error.message })
}
}
module.exports = {createCustomerModel,getList,deleteCustomer};