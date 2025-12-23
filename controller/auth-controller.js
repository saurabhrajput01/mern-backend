const User  = require("../models/usermodels");
const bcrypt = require("bcrypt");
const home = async(req,res)=>{
  try{
        
    res.status(200).send("this is  home");
  }
  catch(error){
    console.log(error);
  }};

const register = async(req,res,next)=>{
   try{
      const {student,email,course,password,role}= req.body;
      const userExit =await User.findOne({email:email});
      if(userExit){
        return res.status(400).json({msg:"already exits"})

      }
      const salt = 10;
      const hash_pass = await bcrypt.hash(password,salt);
      const userCreate = await User.create({student,email,course,password:hash_pass,role:role||"Student"});
      res.status(201).json({msg:"User created",token:await userCreate.generateToken(),userId:userCreate.id.toString(),role:userCreate.role});
   }

   catch(error){
      next(error);
   }
}

const login = async(req,res)=>{
 try {
    const {email,password} =req.body;
    const userExit = await User.findOne({email});
    if (!userExit){
      return res.status(400).json({msg:"invalid crendenial"});
    }
    const user = await bcrypt.compare(password,userExit.password);
    if(user){
      res.status(200).json({msg:"login successfull",token:await userExit.generateToken(),userId:userExit.id.toString(),role:userExit.role});
   } else {
     res.status(401).json({message:"invalid credendial"});
   }
    }
 catch (error) {
    res.status(500).json("internal server error")
 }


}
module.exports ={home,register,login};