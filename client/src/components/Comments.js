import * as React from "react";
import { useSelector } from "react-redux";

import Loader from "./Loader";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const Comments = () => {
  const { dataAllComments, errorAllComments, isLoadingAllComments } =
    useSelector((state) => state.allComments);

  let comments;

  if (isLoadingAllComments) {
    comments = <Loader />;
  } else if (errorAllComments) {
    comments = <p>Error!</p>;
  } else if (dataAllComments) {
    comments = dataAllComments.map((data) => {
      return (
        <React.Fragment key={data._id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>A</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<React.Fragment>{data.comment}</React.Fragment>}
              secondary={data.userId.name}
              secondaryTypographyProps={{
                sx: {
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                },
              }}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      );
    });
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {comments}
    </List> //
  );
};

export default Comments;
