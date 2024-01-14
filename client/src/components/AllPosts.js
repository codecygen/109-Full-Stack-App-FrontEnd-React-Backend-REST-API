import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getEditWindowPost } from "../store/redux/utils/apiStateManagementsThunk";
import { deletePostActions } from "../store/redux/delete-post-slice";

import classes from "./AllPosts.module.scss";

const AllPosts = () => {
  const dispatch = useDispatch();
  const { dataAllPosts } = useSelector((state) => state.allPosts);

  const openDeletePostWindow = (DB) => {
    dispatch(deletePostActions.toggleWindow());
    dispatch(deletePostActions.setData(DB));
  };

  const editButtonHandler = (postId) => {
    dispatch(getEditWindowPost(postId));
  };

  let postContent;

  if (dataAllPosts) {
    postContent = dataAllPosts.map((post) => {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };
      const formattedDate = new Date(post.createdAt).toLocaleDateString(
        "en-US",
        options
      );

      const linkTitleConverted = post.title.toLowerCase().split(" ").join("-");

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
              onClick={editButtonHandler.bind(null, post._id)}
            >
              Edit
            </button>
            <button
              className={classes.button4}
              onClick={openDeletePostWindow.bind(null, post)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  }

  return <>{postContent}</>;
};

export default AllPosts;
