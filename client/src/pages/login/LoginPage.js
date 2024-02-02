import { useState } from "react";

import Signup from "../../components/SignupForm";
import { Box, Switch } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material";

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
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <main className={classes.main}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!isChecked && <p>Login</p>}

        {isChecked && <Signup />}

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
    </main>
  );
};

export default LoginPage;
