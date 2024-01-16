import getConfig from "../config/getConfig";

const updateOnePost = async (
  postId,
  postData,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));
  dispatch(failHandler(true));

  try {
    const res = await fetch(getConfig().updateOnePostEndpoint(postId), {
      method: "PUT",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const data = await res.json();
    dispatch(successHandler(data));
    dispatch(loadingHandler(false));
  } catch (err) {
    dispatch(failHandler(true));
    dispatch(loadingHandler(false));
  }
};

export default updateOnePost;
