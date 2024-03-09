import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

import Loader from "./Loader";
import CommentEditForm from "./CommentEditForm";
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Comments = () => {
  const params = useParams();
  const { token, name, status } = useAuth();
  const commentsSocketIO = useSocket(params.id);

  const { dataAllComments, errorAllComments, isLoadingAllComments } =
    useSelector((state) => state.allComments);

  const { isEditingComment, editedCommentId } = useSelector(
    (state) => state.editComment
  );
  // console.log(isEditingComment);
  // console.log(editedCommentId);

  const initialData = dataAllComments;

  let comments;

  if (isLoadingAllComments) {
    comments = <Loader />;
  } else if (errorAllComments) {
    comments = (
      <p>{errorAllComments}: Couldn't fetch comments! Contact Admin!</p>
    );
  } else if (commentsSocketIO || initialData) {
    // Initially initialData will load and socketio will just establish
    // a connection
    // When you add a new comment after loading the page, initialData will
    // still be there but since commentsSocketIO will have a value that will be
    // assigned as the mapped data to be rendered.
    const renderedData = commentsSocketIO
      ? commentsSocketIO.comment
      : initialData;

    if (renderedData.length === 0) {
      comments = <span>No comments to show...</span>;
    } else {
      comments = renderedData.map((data, index) => {
        const convertedDate = convertDate(data.updatedAt);

        if (data._id === editedCommentId) {
          return (
            <React.Fragment key={data._id}>
              {index === 0 && (
                <Divider
                  variant="inset"
                  component="li"
                  sx={{ width: "85%", margin: "0 0 10px 0" }}
                />
              )}

              <CommentEditForm comment={data.comment} />

              <ListItem
                alignItems="flex-start"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 0,
                  alignItems: "flex-end",
                }}
              >
                <ListItemText
                  secondary={convertedDate}
                  secondaryTypographyProps={{
                    sx: {
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      marginRight: "0",
                    },
                  }}
                />
                <Typography
                  component="p"
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginRight:
                      ((token && data.userId.name === name) ||
                        (token && status === "admin")) &&
                      !isEditingComment
                        ? "24px"
                        : "0",
                  }}
                >
                  {data.userId.status === "admin" && (
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#b4a011" }}
                    />
                  )}
                  {data.userId.name}
                </Typography>
              </ListItem>

              <Divider
                variant="inset"
                component="li"
                sx={{ width: "85%", margin: "10px 0 10px 0" }}
              />
            </React.Fragment>
          );
        }

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
                primary={
                  <React.Fragment>
                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                      {data.comment}
                    </ReactMarkdown>
                  </React.Fragment>
                }
                secondary={convertedDate}
                secondaryTypographyProps={{
                  sx: {
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginRight: "0",
                  },
                }}
              />
              {((token && data.userId.name === name) ||
                (token && status === "admin")) &&
                !isEditingComment && (
                  <CommentDropdownMenu commentDetails={data} />
                )}
            </ListItem>
            <Typography
              component="p"
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight:
                  ((token && data.userId.name === name) ||
                    (token && status === "admin")) &&
                  !isEditingComment
                    ? "24px"
                    : "0",
              }}
            >
              {data.userId.status === "admin" && (
                <FontAwesomeIcon icon={faStar} style={{ color: "#b4a011" }} />
              )}
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
  }

  return (
    <List sx={{ maxWidth: "600px" }}>{comments}</List> //
  );
};

export default Comments;
