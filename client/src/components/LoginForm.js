import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/redux/utils/apiStateManagementsThunk";
import { loginActions } from "../store/redux/login-slice";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import LockIcon from "@material-ui/icons/Lock";
import { CircularProgress, Container, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    isEmailValid,
    isPasswordValid,
    isFormValid,
    errorLoginUser,
    isLoadingLoginUser,
  } = useSelector((state) => state.login);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      dispatch(loginActions.checkEmail(value));
    } else {
      dispatch(loginActions.checkPassword(value));
    }

    dispatch(loginActions.checkForm());
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    dispatch(login(formData));
  };

  // Reset state when the login or signup button is toggled
  useEffect(() => {
    return () => {
      dispatch(loginActions.resetState());
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
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography
              variant="body2"
              sx={{
                margin: "10px 0 -5px 10px",
                textAlign: "left",
                lineHeight: "10px",
                color: "red",
                visibility: errorLoginUser ? "visible" : "hidden",
              }}
            >
              {errorLoginUser}
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
              value={formData.email}
              onChange={changeHandler}
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
              value={formData.password}
              onChange={changeHandler}
              sx={{ backgroundColor: isPasswordValid === false && "#fae3ea" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isFormValid}
            >
              {isLoadingLoginUser ? (
                <CircularProgress
                  style={{ height: "24px", width: "24px", color: "white" }}
                />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
