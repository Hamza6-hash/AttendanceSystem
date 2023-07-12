import User from "../models/User.mjs";
import Attendance from "../models/Attendance.mjs";
import Leave from "../models/Leave.mjs";

export const markAttendance = async (req, res) => {
    try {
        const { status, userId } = req.body

        const today = new Date().setHours(0, 0, 0, 0)
        const attendanceExist = await Attendance.findOne({ userId: userId, date: { $gte: today } })
        if (attendanceExist) return res.status(403).json("Attendance already uploaded today")
        const user = await User.findById(userId)
        let newAttendance = new Attendance({
            userId: user._id,
            status,
        })
        await newAttendance.save()
        res.status(201).json(newAttendance)
    } catch (err) {
        console.log(err)
        res.status(404).json({ err: err.msg })
    }
}

export const userAttendance = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await Attendance.find({ userId: userId })

        console.log(user)
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err.msg })
    }
}

export const OnLeave = async (req, res) => {
    try {
        const { userId, from, to, status, reason } = req.body

        const fromDate = new Date(from)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (fromDate <= today) return res.status(403).json("Invalid date selected")

        const checkLeave = await Leave.findOne({ userId, from: { $gte: today }, to: { $lte: new Date(to) } })

        if (checkLeave) return res.status(404).json("You have already taken the leave for given date")


        const newLeaveRequest = new Leave({
            userId,
            from,
            to,
            status,
            reason
        })
        const newLeave = await newLeaveRequest.save()
        res.status(201).json(newLeave)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err.msg })
    }
}


export const leaveApprovel = async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id)
        const userLeaveApproved = await Leave.find({ userId: id })
        if (!userLeaveApproved) return res.status(404).json("No leave approvel found")
        // console.log(userLeaveApproved)
        res.status(200).json(userLeaveApproved)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ err: err.msg })
    }
}

