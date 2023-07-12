import express from 'express'
import verifyToken from '../middlewares/jwt.mjs'
import {
    getAllAttendanceDetails,
    getLeaveUser,
    deleteUserLeave,
    deleteAttendance,
    updateLeave,
    updateAttendance,
    getUserDetails,
    acceptLeave,
    getUserReport
} from "../controllers/getUserDetails.mjs";

const router = express.Router()

router.get("/user/attendance", verifyToken, getAllAttendanceDetails)

router.get("/user/leave", verifyToken, getLeaveUser)

router.get("/users", verifyToken, getUserDetails)

router.get("/users/report/:id", verifyToken, getUserReport)

router.delete("/delete/leave/:id", verifyToken, deleteUserLeave)

router.delete("/delete/attendance/:id", verifyToken, deleteAttendance)

router.patch("/update/leave/:id", verifyToken, updateLeave)

router.patch("/update/attendance/:id", verifyToken, updateAttendance)

router.patch("/approved/leave/:id", verifyToken, acceptLeave)


export default router