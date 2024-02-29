import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/use-auth";
import { Avatar, Button, Typography } from "@mui/material";

const Logout = () => {
  const navigate = useNavigate();
  const { name, color } = useAuth();
  const [firstChars, setFirstChars] = useState();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenName");
    localStorage.removeItem("tokenExpiry");

    navigate(0);
  };

  useEffect(() => {
    if (name) {
      setFirstChars(name.charAt(0) + name.charAt(1));
    }
  }, [name]);

  return (
    <main>
      <Avatar sx={{ bgcolor: color, margin: "auto" }}>
        {firstChars}
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
