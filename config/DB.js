import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database Connected')
    } catch (error) {
        console.error('Database connection error:', error.message)
        process.exit(1)
    }
}

export default connectionDB