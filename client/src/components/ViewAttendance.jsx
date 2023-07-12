import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import moment from "moment";
import Header from "./widgets/Header";

const ViewAttendance = () => {
  const { _id } = useSelector((state) => state.user);
  const [attendance, setAttendance] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    getUserAttendance();
    // eslint-disable-next-line
  }, []);

  const getUserAttendance = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/attendance/${_id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      // console.log(data);
      setAttendance(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!attendance) return null;
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
            align="center"
            sx={{ flexGrow: 10 }}
            component="div"
            variant="h5"
          >
            Your Attendance
          </Typography>
        }
      />

      <Container maxWidth="md" sx={{ mt: "80px" }}>
        <Divider sx={{ mb: "10px" }} />
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendance.map((userAttendance) => (
                  <TableRow key={userAttendance._id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {userAttendance.status}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {moment(userAttendance.date).format("YYYY-MM-DD h:mm A")}
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
};

export default ViewAttendance;
