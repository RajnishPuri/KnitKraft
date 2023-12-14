
const mongoose = require("mongoose");

const jwt= require("jsonwebtoken");


const studntSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    password: {
        type: String,
    },
    cpassword: {
        type: String,

    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    gender:{
        type:String,
    },

    tokens:[{
        token:{
            type:String,
        }
    }],
    

})


// Authentication & Cookies
studntSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        // res.send("the error part" + error);
        console.log("the error part" + error);
    }
}
 
//  const token = this.generateAuthToken()



const bcrypt=require("bcryptjs");


   studntSchema.pre('save', async function save(next) {
    try {
      if (!this.isModified('password'))   next();
  
      console.log(this.password);
      
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;

      this.cpassword=undefined;
      
  
      return next();
    } catch (error) {
      return next(error);
    }
  });

const Student = new mongoose.model("mystudent", studntSchema);





module.exports = Student;

