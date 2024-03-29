import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Box, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { editCommentActions } from "../store/redux/edit-comment-slice";

import { updateComment } from "../store/redux/utils/apiStateManagementsThunk";

const CommentEditForm = (props) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState(props.data.comment);
  const [isCommentValid, setIsCommentValid] = useState(props.data.comment.length >= 5);

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

    const postId = props.data.messageId;
    const commentId = props.data._id;

    dispatch(updateComment(postId, commentId, comment));
  };

  const cancelHandler = () => {
    dispatch(editCommentActions.toggleEditing());
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        component="form"
        noValidate
        onSubmit={formSubmitHandler}
        sx={{ margin: "10px 0" }}
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
            isCommentValid === false ? "At Least 5 Characters" : "Edit Comment"
          }
          error={isCommentValid === false}
          InputLabelProps={{
            style: { zIndex: -1 }, // Adjust the z-index of the label
          }}
        />
        <Button
          variant="contained"
          onClick={cancelHandler}
          sx={{
            bgcolor: "#9d0c2c",
            "&:hover": {
              bgcolor: "#9d0c2c",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#2d1a54",
            "&:hover": {
              bgcolor: "#2d1a54",
            },
          }}
        >
          Edit
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default CommentEditForm;
