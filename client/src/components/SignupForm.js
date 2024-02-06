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
import { CircularProgress, Container, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { signup } from "../store/redux/utils/apiStateManagementsThunk";

const defaultTheme = createTheme();

const SignupForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    repeatPass: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);

  const {
    isEmailValid,
    isUsernameValid,
    isPasswordValid,
    isRepeatPasswordValid,
    isFormValid,
    dataNewUser,
    errorNewUser,
    isLoadingNewUser,
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

    const signupData = {
      email: formData.email,
      name: formData.username,
      password: formData.password,
    };

    dispatch(signup(signupData));
  };

  // Once the user is created reset states in signup form
  useEffect(() => {
    const initialFormData = {
      email: "",
      username: "",
      password: "",
      repeatPass: "",
    };

    if (dataNewUser && dataNewUser.message) {
      setFormData(initialFormData);
      setSuccessMessage(dataNewUser.message);

      dispatch(signupActions.resetState());
    }
  }, [dataNewUser, dispatch]);

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
            <Typography
              variant="body2"
              sx={{
                margin: "10px 0 -5px 10px",
                textAlign: "left",
                lineHeight: "10px",
                color: "green",
                visibility:
                  successMessage ? "visible" : "hidden",
              }}
            >
              {successMessage}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                margin: "10px 0 -5px 10px",
                textAlign: "left",
                lineHeight: "10px",
                color: "red",
                visibility: errorNewUser ? "visible" : "hidden",
              }}
            >
              {errorNewUser}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                margin: "10px 0 -5px 10px",
                textAlign: "left",
                lineHeight: "10px",
                color: "red",
                visibility: isEmailValid === false ? "visible" : "hidden",
              }}
            >
              Invalid email!
            </Typography>
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
              value={formData.email}
              sx={{
                backgroundColor: isEmailValid === false && "#fae3ea",
              }}
            />

            <Typography
              variant="body2"
              sx={{
                margin: "10px 0 -5px 10px",
                textAlign: "left",
                lineHeight: "10px",
                color: "red",
                visibility: isUsernameValid === false ? "visible" : "hidden",
              }}
            >
              At least 4 characters!
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              type="text"
              onChange={changeHandler}
              value={formData.username}
              sx={{
                backgroundColor: isUsernameValid === false && "#fae3ea",
              }}
            />

            <Typography
              variant="body2"
              sx={{
                margin: "10px 0 -5px 10px",
                textAlign: "left",
                lineHeight: "10px",
                color: "red",
                visibility: isPasswordValid === false ? "visible" : "hidden",
              }}
            >
              At least 6 characters!
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              onChange={changeHandler}
              value={formData.password}
              sx={{
                backgroundColor: isPasswordValid === false && "#fae3ea",
              }}
            />

            <Typography
              variant="body2"
              sx={{
                margin: "10px 0 -5px 10px",
                textAlign: "left",
                lineHeight: "10px",
                color: "red",
                minWidth: "386px",
                visibility:
                  isRepeatPasswordValid === false ? "visible" : "hidden",
              }}
            >
              Passwords don't match!
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="repeatpass"
              label="Repeat Password"
              name="repeatPass"
              type="password"
              onChange={changeHandler}
              value={formData.repeatPass}
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
              {!isLoadingNewUser && "Sign Up"}
              {isLoadingNewUser && (
                <CircularProgress
                  style={{ height: "24px", width: "24px", color: "white" }}
                />
              )}
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
