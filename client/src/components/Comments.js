import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Loader from "./Loader";
import convertDate from "../utils/convertDate";
import CommentDropdownMenu from "../components/CommentDropdownMenu";

import useSocket from "../hooks/use-socket";
import useAuth from "../hooks/use-auth";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

const Comments = () => {
  const { token, name, status } = useAuth();
  const commentsSocketIO = useSocket();

  const { dataAllComments, errorAllComments, isLoadingAllComments } =
    useSelector((state) => state.allComments);

  let comments;

  useEffect(() => {
    // console.log("initialData", dataAllComments);
    // console.log("socket", commentsSocketIO);
    // console.log("token", token);
    // console.log("name", name);
    // console.log("status", status);
  }, [dataAllComments, commentsSocketIO, token, name, status]);

  if (isLoadingAllComments) {
    comments = <Loader />;
  } else if (errorAllComments) {
    comments = <p>{errorAllComments}: Couldn't fetch comments! Contact Admin!</p>;
  } else if (commentsSocketIO || dataAllComments) {
    // Initially dataAllComments will load and socketio will just establish
    // a connection
    // When you add a new comment after loading the page, dataAllComments will
    // still be there but since commentsSocketIO will have a value that will be
    // assigned as the mapped data to be rendered.
    const renderedData = commentsSocketIO ? commentsSocketIO.comment : dataAllComments;

    comments = renderedData.map((data, index) => {
      const convertedDate = convertDate(data.updatedAt);

      return (
        <React.Fragment key={data._id}>
          {index === 0 && (
            <Divider
              variant="inset"
              component="li"
              sx={{ width: "85%", margin: "0 0 10px 0" }}
            />
          )}
          <ListItem alignItems="flex-start" sx={{ padding: 0 }}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: data.userId.color }}>
                {data.userId.name.charAt(0) + data.userId.name.charAt(1)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<React.Fragment>{data.comment}</React.Fragment>}
              secondary={convertedDate}
              secondaryTypographyProps={{
                sx: {
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginRight:
                    ((token && data.userId.name === name) ||
                      (token && status === "admin")) ?
                    "6px" : "30px",
                },
              }}
            />
            {((token && data.userId.name === name) ||
              (token && status === "admin")) && <CommentDropdownMenu />}
          </ListItem>
          <Typography
            component="p"
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: "34px",
            }}
          >
            {data.userId.name}
          </Typography>
          <Divider
            variant="inset"
            component="li"
            sx={{ width: "85%", margin: "10px 0 10px 0" }}
          />
        </React.Fragment>
      );
    });
  }

  return (
    <List sx={{ maxWidth: "600px" }}>{comments}</List> //
  );
};

export default Comments;
