const mongoose=require("mongoose");
require("dotenv").config();

const connectDB=async()=>{
    try {
        const connections=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connection Database is scuccesfully connected at ${connections.connection.host}`);
        
    } catch (error) {
        console.error(`Database connection failed: ${error.message}`);
        process.exit(1);
        
    }
};

module.exports=connectDB;