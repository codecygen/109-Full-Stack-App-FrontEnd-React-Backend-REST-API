import getAPI from "../config/getAPI";

const getOnePost = async (
  id,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));

  try {
    const res = await fetch(getAPI.getOnePost(id));

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

export default getOnePost;
