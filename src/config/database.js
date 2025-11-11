import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connectDb=async()=>{
    try {
        const mongourl=process.env.MONGODB_URL;
        await mongoose.connect(mongourl)
        console.log("datatbase is connected successfully")
    } catch (error) {
        console.log("connection is failed",error)
    }
}

export default connectDb