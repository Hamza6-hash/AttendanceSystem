import mongoose from "mongoose"

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        required: true
    }
})

const Attendance = mongoose.model("Attendance", attendanceSchema)

export default Attendance

