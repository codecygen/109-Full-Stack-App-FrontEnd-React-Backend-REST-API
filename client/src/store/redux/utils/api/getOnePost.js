import getConfig from "../config/getConfig";

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
    const res = await fetch(getConfig(id).getOnePostEndpoint());

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

export default getOnePost;
