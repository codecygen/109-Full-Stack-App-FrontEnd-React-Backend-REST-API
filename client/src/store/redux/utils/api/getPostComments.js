import getAPI from "../config/getAPI";

const getPostComments = async (
  postId,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  try {
    dispatch(loadingHandler(true));
    const res = await fetch(getAPI.getComments(postId));

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

export default getPostComments;
