import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state";
import { useDispatch, useSelector } from "react-redux";

export default function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username } = useSelector((state) => state.user);

  const logout = async () => {
    try {
      await fetch("http://localhost:3001/auth/logout", {
        method: "PATCH",
        body: JSON.stringify({ username }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.name}
          </Typography>

          {props.details}

          {props.leaveRequsets}

          <Button
            onClick={() => {
              navigate("/");
              dispatch(setLogout());
              logout();
            }}
            color="error"
            variant="contained"
            sx={{ mr: 2 }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
