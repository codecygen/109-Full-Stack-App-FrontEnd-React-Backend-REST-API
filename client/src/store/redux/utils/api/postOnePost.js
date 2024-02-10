import getAPI from "../config/getAPI";

const postOnePost = async (
  postDetails,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));

  try {
    const res = await fetch(getAPI.postOnePost, {
      method: "POST",
      // sending-file-from-reactjs-to-nodejs-for-upload
      body: postDetails,

      // Normally like this but here, we upload file to backend.
      // we use a different scenario
      // body: JSON.stringify(postDetails),
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const data = await res.json();
    dispatch(successHandler(data));
    dispatch(loadingHandler(false));
    dispatch(failHandler(false));
    return data;
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};

export default postOnePost;
