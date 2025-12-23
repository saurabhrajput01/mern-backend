const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
student:{
    type: String,
    required: true,
},
email:{
    type:String,
    required:true,
},
course:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:["Admin","Student"],
    default:"Student"
},
enrollmentDate:{
    type:Date,
    default:Date.now
}})
userSchema.methods.generateToken = function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            role:this.role,
        },
    process.env.JWT,
);
    } catch (error) {
console.error(error);
    }
};


const User = new mongoose.model("User",userSchema);

module.exports = User;