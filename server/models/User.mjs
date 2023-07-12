import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    picturePath: {
        type: String,
        required: true
    },
    userType: {
        type: "String",
        required: true
    },
    loginTime: {
        type: Date,
        default: null
    },
    logoutTime: {
        type: Date,
        default: null
    }
})

const User = mongoose.model("User", userSchema)
export default User