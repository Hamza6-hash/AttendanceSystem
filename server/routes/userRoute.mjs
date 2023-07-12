import { getUser } from "../controllers/getUserDetails.mjs";
import { markAttendance, userAttendance, OnLeave, leaveApprovel } from "../controllers/attendance.mjs";
import verifyToken from "../middlewares/jwt.mjs"
import express from 'express'

const router = express.Router()

router.get("/:id", verifyToken, getUser);

router.get("/approvel/:id", verifyToken, leaveApprovel)

router.post('/attendance', verifyToken, markAttendance)

router.post("/leave/request", verifyToken, OnLeave)

router.get("/attendance/:userId", verifyToken, userAttendance)


export default router
