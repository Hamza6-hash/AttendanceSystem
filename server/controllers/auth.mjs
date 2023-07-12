import User from "../models/User.mjs";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const registration = async (req, res) => {
    try {
        let { username, password, userType, picturePath } = req.body
        username = username.charAt(0).toUpperCase() + username.substring(1)
        const salt = 10
        const hashPassword = await bcrypt.hash(password, salt)

        const userExist = await User.findOne({ username: username })

        if (userExist) return res.status(409).json({ "msg": "User already exist", success: false })
        const newUser = new User({
            username,
            password: hashPassword,
            picturePath,
            userType
        })

        const savedUser = await newUser.save()
        res.status(201).json({ savedUser, success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error.msg, success: false })
    }
}

export const login = async (req, res) => {
    try {
        let { username, password } = req.body
        // console.log(username, password, userType)
        username = username.charAt(0).toUpperCase() + username.substring(1)
        const user = await User.findOne({ username: username })

        if (!username) return res.status(404).json("User not found")

        user.loginTime = new Date()
        await user.save()

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json(user)

        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "2 days" })
        delete user.password
        res.status(200).json({ user, token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err.msg, success: false })
    }
}

export const logout = async (req, res) => {
    try {
        const username = req.body
        const user = await User.findOneAndUpdate(
            username,
            { logoutTime: new Date() },
            { new: true }
        )
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.msg })
    }
}