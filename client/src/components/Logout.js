import React from "react";

import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/use-auth";
import { Avatar, Button } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const Logout = () => {
  const navigate = useNavigate();

  const { name } = useAuth();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenName");
    localStorage.removeItem("tokenExpiry");

    navigate(0);
  };

  return (
    <main>
      <p>Welcome {name}</p>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>a</Avatar>
      <Button variant="contained" color="secondary" onClick={logoutHandler}>
        Logout
      </Button>
    </main>
  );
};

export default Logout;
