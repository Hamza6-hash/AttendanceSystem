import User from "../models/User.mjs";
import Attendance from "../models/Attendance.mjs";
import Leave from "../models/Leave.mjs"

export const getUser = async (req, res) => {
    try {
        // const { usrename } = req.body
        const user = await User.findById(req.params.id);
        // console.log(user);
        if (!user) return res.status(404).json("User does not exist");

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json("User does not exist");
    }
};

export const getAllAttendanceDetails = async (req, res) => {
    try {
        const usersAttendance = await Attendance.find().populate("userId")
        res.status(200).json(usersAttendance)
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error.msg })
    }
}

export const getLeaveUser = async (req, res) => {
    try {
        const userOnLeaves = await Leave.find().populate("userId")
        res.status(200).json(userOnLeaves)
        // console.log(userOnLeaves)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.msg })
    }
}

export const deleteUserLeave = async (req, res) => {
    try {
        const userLeave = await Leave.findByIdAndDelete(req.params.id)
        if (!userLeave) return res.status(404).json("Leave not found")
        res.status(200).json(userLeave)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err.msg })
    }

}

export const deleteAttendance = async (req, res) => {
    try {
        const userAttendance = await Attendance.findByIdAndDelete(req.params.id)
        if (!userAttendance) return res.status(404).json("Attendace not found")
        // const
        res.status(200).json(userAttendance)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err.msg })
    }
}

export const updateLeave = async (req, res) => {
    try {
        const { status } = req.body
        const userLeaveUpdate = await Leave.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        if (!userLeaveUpdate) return res.status(404).json("Leave not found")
        res.status(200).json(userLeaveUpdate)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err.msg })
    }
}

export const updateAttendance = async (req, res) => {
    try {
        const { status } = req.body
        const userAttendanceUpdate = await Attendance.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        if (!userAttendanceUpdate) return res.status(404).json("Attendance not fount")
        res.status(200).json(userAttendanceUpdate)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err.msg })
    }
}

export const acceptLeave = async (req, res) => {
    try {
        const { approved } = req.body
        const userLeaveApproved = await Leave.findByIdAndUpdate(
            req.params.id,
            { approved },
            { new: true }
        )
        // if (!userLeaveApproved) return res.status(404).json("Leave request not fonud")
        res.status(200).json(userLeaveApproved)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.msg })
    }
}

export const getUserReport = async (req, res) => {
    try {
        const userReport = await Attendance.find({ userId: req.params.id })
        res.status(200).json(userReport)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.msg })
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) return res.status(404).json("NO users found")
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err.msg })
    }
}