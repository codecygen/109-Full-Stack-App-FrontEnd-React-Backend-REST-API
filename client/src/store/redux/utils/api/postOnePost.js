import API_ENDPOINT from "../config/config";

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
    const res = await fetch(`${API_ENDPOINT}/feed/posts`, {
      method: "POST",
      body: JSON.stringify(postDetails),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const data = await res.json();
    dispatch(successHandler(true));
    dispatch(loadingHandler(false));
    return data;
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};

export default postOnePost;
