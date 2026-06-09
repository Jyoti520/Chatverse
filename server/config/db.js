import mongoose from "mongoose";


const connectDB = async ()=>{
    try {
     const MONGO_URL=process.env.MONGODB_URI

    const mongoConnect=await mongoose.connect(MONGO_URL);
    console.log(`Mongodb connected Successfully`) 
   
    } catch (error) { 
    console.error("database connecting error",error?.message || error);
    process.exit(1)
 }
  
}
export default connectDB