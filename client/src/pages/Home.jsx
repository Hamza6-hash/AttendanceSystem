import {
  Container,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Header from "../components/widgets/Header";

import "../App.css";
import User from "../components/User";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";

const Home = () => {
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [approvel, setApprovel] = useState(null);

  useEffect(() => {
    getLeaveApprovel();
    // eslint-disable-next-line
  }, []);

  const getLeaveApprovel = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/approvel/${_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setApprovel(data);
      console.log(approvel);
    } catch (error) {
      console.log(error);
    }
  };

  if (!approvel) return null;

  return (
    <>
      <Header name="Attendance System" />

      <Container maxWidth="lg" sx={{ mt: "85px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <User />
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography align="center" variant="h6">
              Leave Approval Status
            </Typography>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: "center" }}>
                      Approval Status
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>From</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>To</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvel.map((approve) => (
                    <TableRow key={approve._id}>
                      <TableCell sx={{ textAlign: "center" }}>
                        {approve.approved && approve.approved === "accepted" ? (
                          <>
                            <div style={{ color: "green" }}>
                              {approve.approved}
                            </div>
                          </>
                        ) : approve.approved === "rejected" ? (
                          <div style={{ color: "red" }}>{approve.approved}</div>
                        ) : (
                          <div>Pending...</div>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: "center", whiteSpace: "nowrap" }}
                      >
                        {moment(approve.from).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: "center", whiteSpace: "nowrap" }}
                      >
                        {moment(approve.to).format("YYYY-MM-DD")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
