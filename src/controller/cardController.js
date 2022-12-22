const cardModel= require('../Model/cardModel');
const customerModel= require('../Model/customerModel');
const {isValid,isValidBody} = require('../middleware/validation');


const createCard = async function (req,res){
    try{
    let body=req.body;
    if(!isValidBody(body)) return res.status(400).send({message:'Required to fill body'});
    let {cardNumber,customerName,cardType,customerID}=body;

    let existCardNo=await cardModel.findOne({cardNumber:cardNumber})
    if(existCardNo) return res.status(400).send({message:'card is already exists'});
    if(!isValid(cardNumber)) return res.status(400).send({message:'Required to fill card numbeer'});

    if(!['REGULAR','SPECIAL'].includes(cardType)) return res.status(400).send({message:'You have to give ACTIVE or INACTIVE status'})

    let getUserData = await customerModel.findOne({customerID:customerID})
    if (!getUserData) return res.status(400).send({ status: false, message: "customer not found" })

    let existId=await cardModel.findOne({customerID:customerID})
    if(existId) return res.status(400).send({ status:false,message:'card is already in use'})

    let fullName=getUserData.firstName +' '+getUserData.lastName;
    if(fullName!==customerName) return res.status(400).send({status: false, message: "Your entered name is incorrect"})

    let data=await cardModel.create(body)
    return res.status(200).send({status:true,msg:'Crad issued succussfully',data:data})
}catch(err){
    return res.status(500).send({ message: "Server side Errors. Please try again later", error: error.message })
}
    
}
const getCards=async function (req,res){
    try{
    let getlist=await cardModel.find({status:'ACTIVE'})
    return res.status(200).send({status:true,msg:'Card list',data:getlist})
}catch(err){
    return res.status(500).send({ message: "Server side Errors. Please try again later", error: error.message })
}
}
module.exports={createCard,getCards}