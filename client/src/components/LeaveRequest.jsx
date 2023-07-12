import { useSelector } from "react-redux";
import "../App.css";
import {
  FormControl,
  Card,
  Input,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import swal from "sweetalert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import Header from "./widgets/Header";

const LeaveRequest = () => {
  const { _id } = useSelector((state) => state.user);
  const userId = { _id };
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");
  const status = "Leave";
  const token = useSelector((state) => state.token);

  const submitLeave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/user/leave/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, from, to, status, reason }),
      });
      if (response.ok) {
        swal({
          icon: "success",
          text: "Leave Request Submitted Successfully",
        });
      }
      if (response.status === 403) {
        swal({
          icon: "warning",
          text: "Invalid date selected",
        });
      }
      if (response.status === 404) {
        swal({
          icon: "error",
          text: "Leave already submitted",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header
        name={
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/home">
              <ArrowBackIcon />
            </Link>
          </IconButton>
        }
        details={
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ flexGrow: 10 }}
          >
            Send A Leave Requset
          </Typography>
        }
      />

      <div className="card">
        <Card sx={{ width: "50%", p: "10px" }}>
          <form onSubmit={submitLeave}>
            <FormControl sx={{ width: "100%", p: "25px", m: "5px" }}>
              <p>From:</p>
              <Input
                type="date"
                name="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ width: "100%", p: "25px", m: "5px" }}>
              <p>To:</p>
              <Input
                type="date"
                value={to}
                name="to"
                onChange={(e) => setTo(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ width: "100%", p: "25px", m: "5px" }}>
              <p>Reason:</p>
              <Input
                type="text"
                value={reason}
                name="reason"
                // sx={{ mt: "40px" }}
                onChange={(e) => setReason(e.target.value)}
              />

              <input
                type="checkbox"
                defaultChecked
                name="status"
                style={{ display: "none" }}
                value={status}
              />
              <Button
                sx={{ mt: "20px" }}
                type="submit"
                color="secondary"
                variant="contained"
              >
                Submit Leave Request
              </Button>
            </FormControl>
          </form>
        </Card>
      </div>
    </>
  );
};

export default LeaveRequest;
