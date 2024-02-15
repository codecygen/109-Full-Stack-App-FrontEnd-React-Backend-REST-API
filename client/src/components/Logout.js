import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/use-auth";
import { Avatar, Button, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const Logout = () => {
  const navigate = useNavigate();
  const { name } = useAuth();
  const [firstChar, setFirstChar] = useState();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenName");
    localStorage.removeItem("tokenExpiry");

    navigate(0);
  };

  useEffect(() => {
    if (name) {
      setFirstChar(name.charAt(0));
    }
  }, [name]);

  return (
    <main>
      <Avatar sx={{ bgcolor: deepPurple[500], margin: "auto" }}>
        {firstChar}
      </Avatar>
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          lineHeight: "50px",
        }}
      >
        Welcome <span style={{ fontWeight: "bold" }}>{name}</span>
      </Typography>
      <Button variant="contained" color="secondary" onClick={logoutHandler}>
        Logout
      </Button>
    </main>
  );
};

export default Logout;
