import { registration, login, logout } from "../controllers/auth.mjs";
import express from 'express'
import upload from "../middlewares/fileUpload.mjs"

const router = express.Router()

// Post Routes
router.post('/register', upload.single("picturePath"), registration)
router.post("/login", login)
router.patch("/logout", logout)



export default router