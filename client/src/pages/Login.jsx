import {
  TextField,
  FormControl,
  Paper,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import "../App.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import swal from "sweetalert";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (userType === "Admin" && secretKey !== "adminforweb") {
      swal({
        icon: "error",
        text: "Invalid Admin",
      });
    }
    e.preventDefault();

    const res = await fetch(" http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const loggedIn = await res.json();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
    }
    if (res.ok && userType === "Admin" && secretKey === "adminforweb") {
      navigate("/admin");
    } else if (res.ok && userType === "User") {
      navigate("/home");
    } else if (res.status === 404) {
      swal({
        icon: "warning",
        text: "User not found",
      });
    } else if (res.status === 400) {
      swal({
        icon: "error",
        text: "Incorrect Password",
      });
    }
  };
  return (
    <>
      <Typography variant="h4" align="center" m="10px" color="error">
        Welcome to Attendance System
      </Typography>
      <div className="login">
        <Paper sx={{ p: "18px", width: "40%" }}>
          <Typography align="center" variant="h5">
            Login As
          </Typography>
          <form onSubmit={handleSubmit}>
            <RadioGroup>
              <FormControlLabel
                label="User"
                value="User"
                name="UserType"
                control={<Radio />}
                onChange={(e) => setUserType(e.target.value)}
              />
              <FormControlLabel
                label="Admin"
                control={<Radio />}
                value="Admin"
                name="UserType"
                onChange={(e) => setUserType(e.target.value)}
              />
            </RadioGroup>
            <FormControl sx={{ width: "100%" }}>
              {userType === "Admin" ? (
                <TextField
                  sx={{ mb: "10px" }}
                  label="Secret Key"
                  type="password"
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                />
              ) : null}
              <TextField
                label="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                sx={{ mt: "10px" }}
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </FormControl>
          </form>
          <Typography variant="h6" mt="10px">
            Don't have an account <Link to="/register">Register here?</Link>
          </Typography>
        </Paper>
      </div>
    </>
  );
};

export default Register;
