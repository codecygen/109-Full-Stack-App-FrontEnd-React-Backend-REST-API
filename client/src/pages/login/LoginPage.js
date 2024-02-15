import { useState } from "react";

import SignupForm from "../../components/SignupForm";
import LoginForm from "../../components/LoginForm";
import Logout from "../../components/Logout";

import { Box, Switch } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material";

import useAuth from "../../hooks/use-auth";

import classes from "./LoginPage.module.scss";

const customTheme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        track: {
          backgroundColor: "navy",
        },
        thumb: {
          backgroundColor: "#1d3682",
        },
      },
    },
  },
});

const LoginPage = () => {
  const { token } = useAuth();

  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <main className={classes.main}>
      {token && token !== null && <Logout />}
      {token === null && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {!isChecked && <LoginForm />}

          {isChecked && <SignupForm />}

          <ThemeProvider theme={customTheme}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>Login</p>
              <Switch
                checked={isChecked}
                onChange={handleSwitchChange}
                color="secondary"
              />
              <p>Signup</p>
            </Box>
          </ThemeProvider>
        </Box>
      )}
    </main>
  );
};

export default LoginPage;
