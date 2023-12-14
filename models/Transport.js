const mongoose=require('mongoose');
const schema=mongoose.Schema;

const TransportSchema=new schema({
    farmerId:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    address:{type:String,required:true},
    quantity:{type:String,required:true},
    sourceAddress:{type:String,required:true},
    destAddress:{type:String,required:true},
    vehicleType:{type:String,required:true}
});

module.exports=mongoose.model('Transport',TransportSchema);