const mongoose=require('mongoose');

const cardSchema=new mongoose.Schema({
    cardNumber:{
        type:String,
        required:[true, 'cardNumber'],
        trim:true
    },
    cardType:{
        type:String,
        enum:['REGULAR','SPECIAL'],
        required:[true,'Provide card type'],
        trim:true
    },
    customerName:{
        type:String,
        required:[true,'Customer name of card'],
        trim:true
    },
    status:{
        type:String,
        enum:['ACTIVE', 'DEACTIVE'],
        required:[true,'Status of card'],
        trim:true,
        default:'ACTIVE'
    },
    vision:{
        type:String,
        default:'serve all of our customers'
    },
    customerID:{
        type:String,
        required:[true,'Customer ID'],
        ref:'Customer',
        unique:true
    }
},{timestamps:true})

module.exports =mongoose.model('Card',cardSchema)
