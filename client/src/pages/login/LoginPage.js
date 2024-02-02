import { useState } from "react";

import Signup from "../../components/Signup";
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
          backgroundColor: "#769fb0",
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

  console.log(isChecked);

  return (
    <main className={classes.main}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ThemeProvider theme={customTheme}>
          <Switch
            checked={isChecked}
            onChange={handleSwitchChange}
            color="secondary"
          />
        </ThemeProvider>

        <Signup />
      </Box>
    </main>
  );
};

export default LoginPage;
