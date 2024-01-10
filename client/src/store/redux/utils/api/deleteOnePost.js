import getConfig from "../config/getConfig";

const deleteOnePost = async (
  id,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));
  dispatch(failHandler(false));

  try {
    const res = await fetch(getConfig(id).deleteOnePostEndpoint());

    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const data = res.json();
    dispatch(successHandler(data.message));
    dispatch(loadingHandler(false));
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};

export default deleteOnePost;
