const apiEndPoint = "/database/posts.json";

const getOnePost = async (
  id,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));
  dispatch(failHandler(false));

  try {
    const res = await fetch(apiEndPoint);
    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const result = await res.json();
    const data = result.find((entry) => entry._id === id);
    dispatch(successHandler(data));
    dispatch(loadingHandler(false));
    return data;
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};

export default getOnePost;
