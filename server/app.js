import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/connectDB.mjs'
import authRoutes from "./routes/authRoute.mjs"
import userRoute from "./routes/userRoute.mjs"
import adminRoutes from "./routes/adminRoutes.mjs"
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express();
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use("/assets", express.static(path.join(__dirname, "public/assets")))
const PORT = process.env.PORT
const DATABASE_URI = process.env.DB

connectDB(DATABASE_URI)

app.use("/auth", authRoutes)

app.use("/user", userRoute)

app.use("/status", adminRoutes)


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})