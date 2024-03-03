import getAPI from "../config/getAPI";

const deleteOneComment = async (
  postId,
  commentId,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(getAPI.deleteOneComment(postId), {
      method: "DELETE",
      body: JSON.stringify({ commentId: commentId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP Error! Status Code: ${res.status}`);
    }

    const data = res.json();
    dispatch(successHandler(data));
    dispatch(loadingHandler(false));
    dispatch(failHandler(false));
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};

export default deleteOneComment;
