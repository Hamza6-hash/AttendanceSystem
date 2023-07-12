import {
  TextField,
  FormControl,
  Paper,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
} from "@mui/material";
import "../App.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [picturePath, setPicturePath] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (userType === "Admin" && secretKey !== "adminforweb") {
      swal({
        icon: "error",
        text: "invalid Admin",
      });
    }

    e.preventDefault();

    if (!userType) {
      swal({
        icon: "error",
        text: "Choose user type",
      });
    }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("userType", userType);
    formData.append("picturePath", picturePath.name);

    if (
      (userType === "Admin" &&
        secretKey === "adminforweb" &&
        password &&
        username) ||
      (userType === "User" && password && username)
    ) {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        navigate("/");
      }
      if (res.status === 409) {
        swal({
          icon: "error",
          text: "User already exist:( choose another name",
        });
      }
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" m="10px" color="error">
        Register to Attendance System
      </Typography>
      <div className="login">
        <Paper sx={{ p: "18px", width: "40%" }}>
          <Typography align="center" variant="h5">
            Register As
          </Typography>
          <form onSubmit={handleSubmit}>
            <RadioGroup>
              <FormControlLabel
                label="User"
                value="User"
                control={<Radio />}
                name="UserType"
                onChange={(e) => setUserType(e.target.value)}
              />

              <FormControlLabel
                label="Admin"
                value="Admin"
                control={<Radio />}
                name="UserType"
                onChange={(e) => setUserType(e.target.value)}
              />
            </RadioGroup>

            <FormControl sx={{ width: "100%" }}>
              {userType === "Admin" ? (
                <TextField
                  sx={{ mt: "10px" }}
                  label="Secret Key"
                  type="password"
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                />
              ) : null}
              <TextField
                sx={{ mt: "10px" }}
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
              <input
                type="file"
                id="fileInput"
                accept=".jpeg,.jpg,.png"
                style={{ display: "none", marginTop: "6px" }}
                onChange={(e) => setPicturePath(e.target.files[0])}
              />
              {picturePath.name ? (
                <p style={{ marginTop: "6px" }}>{picturePath.name}</p>
              ) : (
                <label
                  style={{ whiteSpace: "nowrap", marginTop: "6px" }}
                  htmlFor="fileInput"
                >
                  Choose File
                  <IconButton component="span">
                    <CloudUploadIcon fontSize="large" />
                  </IconButton>
                </label>
              )}
              <button type="submit">Register</button>
            </FormControl>
          </form>
          <Typography variant="h6" mt="10px">
            Already have an account <Link to="/">Login here?</Link>
          </Typography>
        </Paper>
      </div>
    </>
  );
};

export default Register;
