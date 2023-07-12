import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  TableContainer,
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import moment from "moment";

export default function StudentReport() {
  const { id } = useParams();
  const token = useSelector((state) => state.token);

  const [report, setReport] = useState(null);

  useEffect(() => {
    viewStudentsReport();
    // eslint-disable-next-line
  }, []);

  const viewStudentsReport = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/status/users/report/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!report) return null;

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            align="center"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Student Report
          </Typography>
        </Toolbar>
      </AppBar>
      {report.map((student) => (
        <Button sx={{ m: "30px" }} color="primary" variant="contained">
          Last login :{" "}
          {moment(student.userId.loginTime).format("YYYY-MM-DD - h:mm A")}
        </Button>
      ))}
      <Container maxWidth="md">
        <Divider sx={{ mb: "10px" }} />
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {/* <TableCell sx={{ textAlign: "center" }}>ID</TableCell> */}
                  <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {report.map((student) => (
                  <TableRow>
                    {/* <TableCell>{student.userId}</TableCell> */}
                    <TableCell sx={{ textAlign: "center" }}>
                      {student.status}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {moment(student.date).format("YYYY-MM-DD h:mm A")}
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
