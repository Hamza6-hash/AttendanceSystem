import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Avatar,
  DialogTitle,
} from "@mui/material";
import swal from "sweetalert";
import moment from "moment";
import Header from "./widgets/Header";

export default function Student() {
  const token = useSelector((state) => state.token);
  const [users, setUsers] = useState(null);

  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(token);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  const getAllUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/status/users", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      //   console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addStatus = async (e) => {
    e.preventDefault();
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
        text: "Attendance uploaded successfully",
      });
    } else {
      swal({
        icon: "warning",
        text: "Attendace submitted by the user",
      });
    }
  };
  if (!users) return null;
  return (
    <>
      <Header
        name="Student details"
        details={
          <Button
            color="warning"
            variant="contained"
            sx={{ mr: "20px" }}
            onClick={handleOpen}
          >
            Add Student Attendance
          </Button>
        }
      />

      <Dialog sx={{ p: "20px" }} fullWidth open={open}>
        <DialogTitle>Add Student Attendance</DialogTitle>
        <DialogContent>
          <form onSubmit={addStatus}>
            <TextField
              name="userId"
              margin="dense"
              label="Add ID"
              fullWidth
              type="text"
              variant="standard"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <TextField
              name="status"
              margin="dense"
              label="Add Status"
              fullWidth
              type="text"
              variant="standard"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
            <Button
              sx={{
                width: "20%",
                borderRadius: "10px",
                p: "8px",
                mt: "10px",
              }}
              type="submit"
              color="success"
              variant="contained"
            >
              Add
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="standard" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="md" sx={{ mt: "100px" }}>
        <Divider sx={{ mb: "10px" }} />
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>Profile</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>ID</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Name</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Last Login</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    Last Logout
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>User-Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Avatar
                        src={`http://localhost:3001/assets/${user.picturePath}`}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {user._id}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {user.username}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {moment(user.loginTime).format("YYYY-MM-DD - h:mm A")}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {moment(user.logoutTime).format("YYYY-MM-DD - h:mm A")}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {user.userType}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}
