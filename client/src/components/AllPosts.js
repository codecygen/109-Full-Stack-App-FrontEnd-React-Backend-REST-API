import { useDispatch, useSelector } from "react-redux";

import { getEditWindowPost } from "../store/redux/utils/apiStateManagementsThunk";
import { deletePostActions } from "../store/redux/delete-post-slice";

import Post from "./Post";

const AllPosts = () => {
  const dispatch = useDispatch();
  const { dataAllPosts } = useSelector((state) => state.allPosts);

  const {
    dataDeletePost,
    responseDeletePost,
    // errorDeletePost,
    // isLoadingDeletePost,
  } = useSelector((state) => state.deletePost);

  if (responseDeletePost) {
    console.log(dataDeletePost._id);
  }

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
        <Post
          key={post._id}
          post={post}
          formattedDate={formattedDate}
          linkTitleConverted={linkTitleConverted}
          editButtonClick={editButtonHandler}
          deleteButtonClick={openDeletePostWindow}
        />
      );
    });
  }

  return <>{postContent}</>;
};

export default AllPosts;
