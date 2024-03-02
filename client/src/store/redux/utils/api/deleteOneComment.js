import getAPI from "../config/getAPI";

const deleteOneComment = async (
  postId,
  commentId,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  console.log(postId);
  console.log(commentId);
  console.log(getAPI.deleteOneComment(postId));
};

export default deleteOneComment;
