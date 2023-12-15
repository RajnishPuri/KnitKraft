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
    vehicleType:{type:String,required:true},
    // i want to add a key progress which store in format progress:{initiated:true,shipped:false, "out for delivery":false , delivered:false}  }
    progress:{type:Object,required:true,default:{initiated:true,shipped:false, outForDelivery:false , delivered:false} },
});

module.exports=mongoose.model('Transport',TransportSchema);