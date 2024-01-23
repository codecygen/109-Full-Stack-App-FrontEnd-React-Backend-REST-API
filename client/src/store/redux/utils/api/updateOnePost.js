import getAPI from "../config/getAPI";

const updateOnePost = async (
  postId,
  postData,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));
  dispatch(failHandler(false));

  try {
    const res = await fetch(getAPI.updateOnePost(postId), {
      method: "PUT",
      body: postData,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const data = await res.json();
    dispatch(successHandler(data.post));
    dispatch(loadingHandler(false));
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};

export default updateOnePost;
