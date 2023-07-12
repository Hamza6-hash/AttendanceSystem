import mongoose from "mongoose";

const connectDB = async (DB_URI) => {
    const DB_OPTION = {
        dbName: "AttendanceSystem"
    }
    try {
        await mongoose.connect(DB_URI, DB_OPTION)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB