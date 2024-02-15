import { useEffect } from "react";

import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import useBlink from "../hooks/use-blink";
import useAuth from "../hooks/use-auth";

import classes from "./Post.module.scss";

const Post = ({
  post,
  formattedDate,
  linkTitleConverted,
  editButtonClick,
  deleteButtonClick,
}) => {
  const { token } = useAuth();
  const { dataEditResult } = useSelector((state) => state.editPost);

  const { currentStyle, blinkHandler } = useBlink(
    classes.post,
    classes["post-edited"]
  );

  useEffect(() => {
    if (dataEditResult && post._id) {
      if (dataEditResult._id === post._id) {
        blinkHandler();
      }
    }
  }, [dataEditResult, blinkHandler, post._id]);

  return (
    <div className={currentStyle} key={post._id}>
      <p>
        Posted by {post.creator.name} on {formattedDate}
      </p>
      <h1>{post.title}</h1>
      <div className={classes.buttons}>
        <button className={classes.button1}>
          <NavLink to={`/details/${linkTitleConverted}/${post._id}`}>
            View
          </NavLink>
        </button>

        {token && (
          <button
            className={classes.button1}
            onClick={editButtonClick.bind(null, post._id)}
          >
            Edit
          </button>
        )}

        {token && (
          <button
            className={classes.button4}
            onClick={deleteButtonClick.bind(null, post)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
