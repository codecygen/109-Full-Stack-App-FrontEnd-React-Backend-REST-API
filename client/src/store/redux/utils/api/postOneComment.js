import getAPI from "../config/getAPI";

const postOneComment = async (
  postId,
  commentString,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  try {
    dispatch(loadingHandler(true));

    const token = localStorage.getItem("token");

    const res = await fetch(getAPI.postOneComment(postId), {
      method: "POST",
      body: JSON.stringify({ comment: commentString }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const data = await res.json();
    dispatch(successHandler(data));
    dispatch(loadingHandler(false));
    dispatch(failHandler(false));
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};

export default postOneComment;
