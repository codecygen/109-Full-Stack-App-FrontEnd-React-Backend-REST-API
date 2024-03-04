import * as React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { deleteComment } from "../store/redux/utils/apiStateManagementsThunk";
import { deleteCommentActions } from "../store/redux/delete-comment-slice";

const options = ["Edit", "Delete"];

const CommentDropdownMenu = ({ commentDetails }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    const postId = params.id;
    const commentId = commentDetails._id;

    if (action === "Edit") {
      // Perform edit action
      console.log("Edit action clicked");
      console.log(postId);
      console.log(commentId);
    } else if (action === "Delete") {
      // Perform delete action
      // dispatch(deleteComment(postId, commentId));

      dispatch(deleteCommentActions.toggleWindow());
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          padding: 0,
          backgroundColor: "#bfc1db",
          borderRadius: "50%",
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose("")}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => handleClose(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CommentDropdownMenu;
