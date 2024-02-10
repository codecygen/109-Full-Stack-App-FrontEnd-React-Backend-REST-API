import getAPI from "../config/getAPI";

const signupOneUser = async (
  signupData,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));

  try {
    const res = await fetch(getAPI.signupUser, {
      method: "PUT",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.errors) {
      throw new Error(data.errors[0].msg)
    }

    dispatch(successHandler(data));
    dispatch(loadingHandler(false));
    dispatch(failHandler(false));
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};

export default signupOneUser;
