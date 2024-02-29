import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Box, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { postComment } from "../store/redux/utils/apiStateManagementsThunk";

const CommentForm = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [comment, setComment] = useState("");
  const [isCommentValid, setIsCommentValid] = useState(null);

  const defaultTheme = createTheme();

  const changeHandler = (e) => {
    const value = e.target.value;
    setComment(value);

    if (value.length <= 5) {
      setIsCommentValid(false);
    } else if (value.length > 5) {
      setIsCommentValid(true);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!isCommentValid) {
      setIsCommentValid(false);
      return;
    }

    const postId = params.id;

    dispatch(postComment(postId, comment));

    setComment("");
    setIsCommentValid(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        component="form"
        noValidate
        onSubmit={formSubmitHandler}
        sx={{ margin: "30px 0" }}
      >
        <TextField
          required
          fullWidth
          margin="normal"
          id="comment"
          name="comment"
          autoComplete="off"
          multiline
          rows={3}
          onChange={changeHandler}
          value={comment}
          label={
            isCommentValid === false ? "At Least 5 Characters" : "Add a Comment"
          }
          error={isCommentValid === false}
          InputLabelProps={{
            style: { zIndex: -1 } // Adjust the z-index of the label
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#063d49",
            "&:hover": {
              bgcolor: "#063d49",
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
