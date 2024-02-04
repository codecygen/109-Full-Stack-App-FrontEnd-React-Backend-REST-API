import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { signupActions } from "../store/redux/signup-slice";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const SignupForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    repeatPass: "",
  });

  const {
    isEmailValid,
    isUsernameValid,
    areBothPassesValid,
    isPasswordValid,
    isRepeatPasswordValid,
    isFormValid,
  } = useSelector((state) => state.signup);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    if (name === "email") {
      dispatch(signupActions.checkEmail(value));
    } else if (name === "username") {
      dispatch(signupActions.checkName(value));
    } else if (name === "password") {
      dispatch(
        signupActions.checkPassword({
          password: value,
          repeatPassword: formData.repeatPass,
        })
      );
    } else if (name === "repeatPass") {
      dispatch(
        signupActions.checkRepeatPassword({
          password: formData.password,
          repeatPassword: value,
        })
      );
    }

    dispatch(signupActions.checkForm());
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    console.log("====================");
    console.log("email: ", isEmailValid);
    console.log("username: ", isUsernameValid);
    console.log("all passes: ", areBothPassesValid);
    console.log("password: ", isPasswordValid);
    console.log("repeat password: ", isRepeatPasswordValid);
    console.log("form: ", isFormValid);
  };

  // Reset state when the login or signup button is toggled
  useEffect(() => {
    return () => {
      dispatch(signupActions.resetState());
    };
  }, [dispatch]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountBoxIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={submitHandler} noValidate>
            <Typography variant="body1">sadsd</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              onChange={changeHandler}
              sx={{
                backgroundColor: isEmailValid === false && "#fae3ea",
              }}
            />
            <Typography variant="body1">sadsd</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              type="text"
              onChange={changeHandler}
              sx={{
                backgroundColor: isUsernameValid === false && "#fae3ea",
              }}
            />
            <Typography variant="body1">sadsd</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              onChange={changeHandler}
              sx={{
                backgroundColor: isPasswordValid === false && "#fae3ea",
              }}
            />

            {/* <Typography variant="body1">sadsd</Typography> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="repeatpass"
              label="Repeat Password"
              name="repeatPass"
              type="password"
              onChange={changeHandler}
              sx={{
                backgroundColor: isRepeatPasswordValid === false && "#fae3ea",
              }}
            />
            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isFormValid}
            >
              Sign Up
            </Button>
            {/* <Grid container> */}
            {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
            {/* </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;
