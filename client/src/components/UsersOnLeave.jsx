import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Input,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  Avatar,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import moment from "moment";
import Header from "./widgets/Header";

const UsersOnLeave = () => {
  const [onLeaveUsers, setOnLeaveUsers] = useState(null);
  const token = useSelector((state) => state.token);
  const { userType } = useSelector((state) => state.user);
  const [input, setInput] = useState(false);
  const [status, setStatus] = useState("");
  const [edit, setEditing] = useState("");

  const [approved, setApproved] = useState("");

  // const approved = "Accept";

  // const reject = "Reject";

  useEffect(() => {
    getUserOnLeaves();
    // eslint-disable-next-line
  }, []);

  const getUserOnLeaves = async () => {
    try {
      const response = await fetch("http://localhost:3001/status/user/leave", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data);
      setOnLeaveUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, e) => {
    e.preventDefault();
    if (userType === "Admin") {
      try {
        const response = await fetch(
          `http://localhost:3001/status/update/leave/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
          }
        );
        // const res = await response.json();
        // console.log(res);
        if (response.ok) {
          swal({
            icon: "info",
            text: "status update successfully",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteLeave = async (id) => {
    // console.log(id);
    if (userType === "Admin") {
      try {
        const response = await fetch(
          `http://localhost:3001/status/delete/leave/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          setOnLeaveUsers((prevLeave) =>
            prevLeave.filter((leave) => leave._id !== id)
          );
          swal({
            icon: "info",
            text: "Leave Delete Successfully",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const acceptOrRejectLeave = async (id, e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3001/status/approved/leave/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ approved }),
        }
      );
      // const data = await res.json();
      // console.log(data);
      if (res.ok) {
        swal({
          icon: "success",
          text: "Response Submitted",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   const { _id } = onLeaveUsers;
  if (!onLeaveUsers) return null;
  //   console.log(onLeaveUsers._id);

  return (
    <>
      <Header
        name={
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/admin"
            >
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
            On Leave Employees
          </Typography>
        }
      />

      <Container maxWidth="lg" sx={{ mt: "80px" }}>
        <Divider sx={{ mb: "10px" }} />
        <Paper sx={{ height: 400, overflow: "auto" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>Profile</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Reason</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>From</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>To</TableCell>
                  {userType === "Admin" ? (
                    <>
                      <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>Edit</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>Accept</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>Reject</TableCell>
                    </>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {onLeaveUsers.map((leave) => (
                  <TableRow key={leave._id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Avatar
                        src={`http://localhost:3001/assets/${leave.userId.picturePath}`}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {leave.userId.username}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {edit === leave._id && userType === "Admin" && input ? (
                        <form onSubmit={(e) => updateStatus(leave._id, e)}>
                          <Input
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          />
                          <button type="submit">update</button>
                        </form>
                      ) : (
                        <div>{leave.status}</div>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {leave.reason}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {moment(leave.from).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {moment(leave.to).format("YYYY-MM-DD")}
                    </TableCell>
                    {userType === "Admin" ? (
                      <>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              deleteLeave(leave._id);
                            }}
                          >
                            <DeleteForeverIcon color="error" />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              setEditing(leave._id);
                              input ? setInput(false) : setInput(true);
                            }}
                          >
                            <EditIcon color="primary" />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          {leave.approved === "" ? (
                            <form
                              onSubmit={(e) =>
                                acceptOrRejectLeave(leave._id, e)
                              }
                            >
                              <FormControlLabel
                                control={<Checkbox />}
                                name="approved"
                                color="error"
                                value="accepted"
                                onChange={(e) => setApproved(e.target.value)}
                              />
                              <Button type="submit" variant="contained">
                                Accept
                              </Button>
                            </form>
                          ) : leave.approved === "accepted" ? (
                            <div style={{ textAlign: "center" }}>Accpeted</div>
                          ) : null}
                        </TableCell>
                        <TableCell>
                          {leave.approved === "rejected" ? (
                            <div style={{ textAlign: "center" }}>Rejected</div>
                          ) : leave.approved === "" ? (
                            <form
                              onSubmit={(e) =>
                                acceptOrRejectLeave(leave._id, e)
                              }
                            >
                              <FormControlLabel
                                control={<Checkbox />}
                                name="approved"
                                color="error"
                                value="rejected"
                                onChange={(e) => setApproved(e.target.value)}
                              />
                              <Button
                                type="submit"
                                variant="contained"
                                color="error"
                              >
                                Reject
                              </Button>
                            </form>
                          ) : null}
                        </TableCell>
                        {/* <TableCell>
                          <Button
                            variant="contained"
                            onClick={() => rejectLeave(leave._id)}
                            color="error"
                          >
                            <input
                              type="checkbox"
                              defaultChecked
                              style={{ display: "none" }}
                              value={reject}
                              // onClick={(e) => setApproved("reject")}
                            />
                            Reject
                          </Button>
                        </TableCell> */}
                      </>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default UsersOnLeave;
