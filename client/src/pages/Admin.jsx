import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Container,
  Paper,
  Divider,
  IconButton,
  Input,
  CircularProgress,
  Button,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import swal from "sweetalert";
import moment from "moment";
import Header from "../components/widgets/Header";

const Admin = () => {
  const [users, setUsers] = useState(null);
  const token = useSelector((state) => state.token);

  // const navigate = useNavigate();

  const { userType } = useSelector((state) => state.user);

  const [input, setInput] = useState(false);
  const [status, setStatus] = useState("");

  const [edit, setEditing] = useState("");

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/status/user/attendance",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAttendace = async (id) => {
    if (userType === "Admin") {
      try {
        const response = await fetch(
          `http://localhost:3001/status/delete/attendance/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // const data = response.json();
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        if (response.status === 200) {
          swal({
            icon: "info",
            text: "Attendance Delete Successfully",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateStatus = async (id, e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3001/status/update/attendance/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (res.ok) {
        // setUsers((prevState) =>
        //   prevState.filter((user) => user.status !== status)
        // );
        swal({
          icon: "info",
          text: "Attendance Updated Successfully",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!users) return null;

  return (
    <>
      <Header
        name="Student Attendance"
        details={
          <Button color="success" variant="contained" sx={{ mr: 2 }}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/student"
            >
              Students Details
            </Link>
          </Button>
        }
        leaveRequsets={
          <Button color="warning" variant="contained" sx={{ mr: 2 }}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/users/leave"
            >
              Leave Requests
            </Link>
          </Button>
        }
      />
      <Container maxWidth="md" sx={{ mt: "80px" }}>
        <Divider sx={{ mb: "10px" }} />
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>Profile</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Date</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Time</TableCell>
                  {userType === "Admin" ? (
                    <>
                      <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>Edit</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        Student Report
                      </TableCell>
                    </>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {users ? (
                  users
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((user) => (
                      <TableRow key={user._id}>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Avatar
                            src={`http://localhost:3001/assets/${user.userId.picturePath}`}
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {user.userId.username}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {edit === user._id && input ? (
                            <form onSubmit={(e) => updateStatus(user._id, e)}>
                              <Input
                                key={user._id}
                                type="text"
                                value={status}
                                name="status"
                                onChange={(e) => setStatus(e.target.value)}
                              />
                              <button
                                style={{ marginLeft: "10px" }}
                                type="submit"
                              >
                                update
                              </button>
                            </form>
                          ) : (
                            <div>{user.status}</div>
                          )}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {moment(user.date).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {moment(user.date).format("h:mm A")}
                        </TableCell>
                        {userType === "Admin" ? (
                          <>
                            <TableCell sx={{ textAlign: "center" }}>
                              <IconButton
                                onClick={() => deleteAttendace(user._id)}
                              >
                                <DeleteForeverIcon color="error" />
                              </IconButton>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <IconButton
                                onClick={() =>
                                  setEditing(user._id) || input
                                    ? setInput(false)
                                    : setInput(true)
                                }
                              >
                                <EditIcon color="primary" />
                              </IconButton>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <IconButton>
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                  }}
                                  to={`/report/${user.userId._id}`}
                                >
                                  <VisibilityIcon color="secondary" />
                                </Link>
                              </IconButton>
                            </TableCell>
                          </>
                        ) : null}
                      </TableRow>
                    ))
                ) : (
                  // <p>
                  <CircularProgress color="primary" />
                  // </p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default Admin;
