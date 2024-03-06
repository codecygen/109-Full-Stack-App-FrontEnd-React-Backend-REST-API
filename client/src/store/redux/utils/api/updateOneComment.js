import getAPI from "../config/getAPI";

const editOneComment = async (
  postId,
  commentId,
  updatedComment,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(getAPI.updateOneComment(postId), {
      method: "PUT",
      body: JSON.stringify({
        updatedComment,
        commentId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const data = await res.json();
    dispatch(successHandler(data.post));
    dispatch(loadingHandler(false));
    dispatch(failHandler(false));
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};

export default editOneComment;
