import getAPI from "../config/getAPI";

const editOneComment = async (
  postId,
  commentId,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  console.log(postId);
  console.log(commentId);
  console.log(getAPI.editOneComment(postId));
};

export default editOneComment;
