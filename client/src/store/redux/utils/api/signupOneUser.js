import getAPI from "../config/getAPI";

const signupOneUser = async (
  signupData,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));
  dispatch(failHandler(false));

  try {
    const res = await fetch(getAPI.signupUser, {
      method: "PUT",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const data = await res.json();
    dispatch(successHandler(data));
    dispatch(loadingHandler(false));
  } catch (err) {
    dispatch(failHandler(err.message));
  }
};

export default signupOneUser;
