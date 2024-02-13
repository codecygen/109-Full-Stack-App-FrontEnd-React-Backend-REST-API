import getAPI from "../config/getAPI";

const updateOnePost = async (
  postId,
  postData,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(getAPI.updateOnePost(postId), {
      method: "PUT",
      // sending-file-from-reactjs-to-nodejs-for-upload
      body: postData,
      headers: {
        Authorization: `Bearer ${token}`,
      },

      // Normally like this but here, we upload file to backend.
      // we use a different scenario
      // body: JSON.stringify(postData),
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    });

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

export default updateOnePost;
