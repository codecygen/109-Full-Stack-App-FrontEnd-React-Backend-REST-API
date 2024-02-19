import { useEffect, useState } from "react";

import SignupForm from "../../components/SignupForm";
import LoginForm from "../../components/LoginForm";
import Logout from "../../components/Logout";

import Loader from "../../components/Loader";

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
  const [isPageLoading, setIsPageLoading] = useState(null);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (token) {
      setIsPageLoading(true);

      const timeout = setTimeout(() => {
        setIsPageLoading(false);
      }, 30);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setIsPageLoading(false);
    }
  }, [token]);

  return (
    <main className={classes.main}>
      {isPageLoading && <Loader />}
      {isPageLoading === false && token && <Logout />}
      {isPageLoading === false && !token && (
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
