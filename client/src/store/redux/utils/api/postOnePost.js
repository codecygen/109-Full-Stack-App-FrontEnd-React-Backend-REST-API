import getConfig from "../config/getConfig";

const postOnePost = async (
  postDetails,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));
  dispatch(failHandler(false));

  try {
    const res = await fetch(getConfig().postOnePostEndpoint(), {
      method: "POST",
      body: postDetails,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const data = await res.json();
    dispatch(successHandler(data));
    dispatch(loadingHandler(false));
    return data;
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};

export default postOnePost;
