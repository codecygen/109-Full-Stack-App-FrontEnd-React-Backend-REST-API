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
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      dispatch(signupActions.checkEmail(formData.email));
    } else if (name === "username") {
      dispatch(signupActions.checkName(formData.username));
    } else if (name === "password" || name === "repeatPass") {
      dispatch(
        signupActions.checkPassword({
          password: formData.password,
          repeatPassword: formData.repeatPass,
        })
      );
    }
  };

  const blurHandler = (e) => {
    const { name } = e.target;

    if (name === "email") {
      dispatch(signupActions.checkEmail(formData.email));
    } else if (name === "username") {
      dispatch(signupActions.checkName(formData.username));
    } else if (name === "password" || name === "repeatPass") {
      dispatch(
        signupActions.checkPassword({
          password: formData.password,
          repeatPassword: formData.repeatPass,
        })
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signupActions.checkEmail(formData.email));

    dispatch(signupActions.checkName(formData.username));

    dispatch(
      signupActions.checkPassword({
        password: formData.password,
        repeatPassword: formData.repeatPass,
      })
    );

    dispatch(signupActions.checkForm());
  };

  useEffect(() => {
    console.log("====================");
    console.log("email: ", isEmailValid);
    console.log("username: ", isUsernameValid);
    console.log("all passes: ", areBothPassesValid);
    console.log("password: ", isPasswordValid);
    console.log("repeat password: ", isRepeatPasswordValid);
    console.log("form: ", isFormValid);
  }, [
    isEmailValid,
    isUsernameValid,
    areBothPassesValid,
    isPasswordValid,
    isRepeatPasswordValid,
    isFormValid,
  ]);

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
              onBlur={blurHandler}
              sx={{
                backgroundColor: isEmailValid === false && '#fae3ea',
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              type="text"
              // autoFocus
              onChange={changeHandler}
              onBlur={blurHandler}
              sx={{
                backgroundColor: isUsernameValid === false && '#fae3ea',
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              // autoFocus
              onChange={changeHandler}
              onBlur={blurHandler}
              sx={{
                backgroundColor: isPasswordValid === false && '#fae3ea',
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="repeatpass"
              label="Repeat Password"
              name="repeatPass"
              type="password"
              // autoFocus
              onChange={changeHandler}
              onBlur={blurHandler}
              sx={{
                backgroundColor: isRepeatPasswordValid === false && '#fae3ea',
              }}
            />
            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
            <Button type="submit" fullWidth variant="contained">
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
