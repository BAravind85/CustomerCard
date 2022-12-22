const mongoose=require('mongoose');
const {v4:uuidv4}=require('uuid');


const customerSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    mobileNumber:{
        type:Number,
        required:true,
        trim:true
    },
    DOB:{
        type:Date,
    },
    emailID:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    customerID:{
        type:String,
        default:uuidv4()
    },
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        trim:true
    },
},{timestamps:true})

module.exports=mongoose.model('Customer',customerSchema)