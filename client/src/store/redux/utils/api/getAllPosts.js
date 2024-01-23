import getAPI from "../config/getAPI";

const getAllPosts = async (
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));
  dispatch(failHandler(false));

  console.log(getAPI.getAllPosts);

  try {
    const res = await fetch(getAPI.getAllPosts);
    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const data = await res.json();

    dispatch(successHandler(data.posts));
    dispatch(loadingHandler(false));
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};


export default getAllPosts;