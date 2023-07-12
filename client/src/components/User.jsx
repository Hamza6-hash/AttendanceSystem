import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Tooltip,
  Avatar,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import swal from "sweetalert";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
// import ViewAttendance from "./ViewAttendance";

const User = () => {
  const [user, setUser] = useState(null);
  const { _id } = useSelector((state) => state.user);
  const userId = _id;
  const status = "Present";
  // const [picture, setPicture] = useState("");
  const token = useSelector((state) => state.token);

  // const isMobileScreen = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const sumbitAttendance = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/user/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, status }),
      });
      if (response.ok) {
        swal({
          icon: "success",
          text: "Attendance Uploaded successfully",
        });
      } else if (!response.ok) {
        swal({
          icon: "error",
          text: "Something went wrong",
        });
      }
      if (response.status === 403) {
        swal({
          icon: "warning",
          text: "Attendance already submitted today",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return null;

  const { username, picturePath, loginTime } = user;

  return (
    <>
      <Box display="flex">
        <Avatar
          src={`http://localhost:3001/assets/${picturePath}`}
          sx={{ width: 100, height: 100, objectFit: "cover" }}
        />
        <Typography m="22px" variant="h5">
          {username}
        </Typography>
        <Typography m="22px" variant="h5">
          {moment(loginTime).format("YYYY-MM-DD - h:mm A")}
        </Typography>
      </Box>
      <form onSubmit={sumbitAttendance}>
        <Paper sx={{ p: "20px", mt: "10px", width: "75%" }}>
          <Stack spacing={2}>
            <Tooltip title="Upload Attendance" arrow>
              <Button type="submit" color="primary" variant="contained">
                <input
                  type="checkbox"
                  name="status"
                  value={status}
                  defaultChecked
                  style={{ display: "none" }}
                />
                Mark Attendance
              </Button>
            </Tooltip>
            <Tooltip title="view attendance" arrow>
              <Button color="success" variant="contained">
                <Link
                  to="/attendance"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    width: "100%",
                  }}
                >
                  View Attendace
                </Link>
              </Button>
            </Tooltip>
            <Button
              sx={{ alignItems: "center" }}
              color="error"
              variant="contained"
            >
              <Link
                to="/leave"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                Leave Request
              </Link>
            </Button>
          </Stack>
        </Paper>
      </form>
    </>
  );
};

export default User;
