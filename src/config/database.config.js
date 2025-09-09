import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async() => {
    try {
        await mongoose.connect(config.CONNECTION_STRING, {})
    } catch (error) {
        
    }
}

export default connectDB;