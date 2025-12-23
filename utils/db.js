const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const connectdb = async()=>{

    try{
        await mongoose.connect(URI);
            console.log("connected");
        
    } catch (error) {
     console.log("data base connection failed",error);
    }
}



module.exports = connectdb;
