import { NavLink } from "react-router-dom";

import classes from "./Post.module.scss";

const Post = ({
  post,
  formattedDate,
  linkTitleConverted,
  editButtonClick,
  deleteButtonClick,
}) => {
  return (
    <div className={classes.post} key={post._id}>
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
        <button
          className={classes.button1}
          onClick={editButtonClick.bind(null, post._id)}
        >
          Edit
        </button>
        <button
          className={classes.button4}
          onClick={deleteButtonClick.bind(null, post)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
