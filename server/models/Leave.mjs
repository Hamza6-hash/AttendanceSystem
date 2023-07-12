import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    approved: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const Leave = mongoose.model("LeaveRequest", leaveSchema)

export default Leave