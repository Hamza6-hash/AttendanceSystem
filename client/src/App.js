import Register from "./pages/Register"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import ViewAttendance from "./components/ViewAttendance"
import LeaveRequest from "./components/LeaveRequest"
import UsersOnLeave from "./components/UsersOnLeave"
import Student from "./components/Student"
import StudentReport from "./components/StudentReport"
import { useSelector } from "react-redux"

export default function App() {
    const isAuth = Boolean(useSelector((state) => state.token))
    return (
        <Router>
            <Routes>
                <Route path="/home" element={isAuth ? <Home /> : <Navigate to={'/'} />} />
                <Route path="/admin" element={isAuth ? <Admin /> : <Navigate to={'/'} />} />
                <Route path="/student" element={isAuth ? < Student /> : <Navigate to={'/'} />} />
                <Route path="/report/:id" element={isAuth ? < StudentReport /> : <Navigate to={'/'} />} />
                <Route path="/users/leave" element={isAuth ? <UsersOnLeave /> : <Navigate to={'/'} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/attendance" element={isAuth ? <ViewAttendance /> : <Navigate to={'/'} />} />
                <Route path="/leave" element={isAuth ? <LeaveRequest /> : <Navigate to={'/'} />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    )
}
