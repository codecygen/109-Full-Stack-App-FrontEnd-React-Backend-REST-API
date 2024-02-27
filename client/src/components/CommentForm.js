import { Button, Box, Typography, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";

const CommentForm = () => {
  const defaultTheme = createTheme();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    console.log("submitted");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box component="form" noValidate onSubmit={formSubmitHandler}>
        <Typography component="p">Add a comment...</Typography>
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "red",
            "&:hover": {
              bgcolor: "red",
            },
          }}
        >
          Add Comment
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default CommentForm;
