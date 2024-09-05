import mongoose from "mongoose";


const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected successfully");
        
    }catch(error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB