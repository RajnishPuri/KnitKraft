const mongoose=require('mongoose');
const schema=mongoose.Schema;

const MeetingSchema=new schema({
    farmerId:{type:String,required:true},
    name:{type:String,required:true},
    topic:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    message:{type:String,required:true},
    response:{type:String,required:false,default:""},
    status:{type:String,required:true,default:"pending"},
});
// set this in global and then use it in routes

module.exports=mongoose.model('Meeting',MeetingSchema);