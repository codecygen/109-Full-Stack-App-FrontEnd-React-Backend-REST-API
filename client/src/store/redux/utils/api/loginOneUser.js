import getAPI from "../config/getAPI";

const loginOneUser = async (
  loginData,
  dispatch,
  successHandler,
  loadingHandler,
  failHandler
) => {
  dispatch(loadingHandler(true));

  try {
    const res = await fetch(getAPI.loginUser, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.errors) {
      throw new Error(data.errors[0].msg);
    }

    dispatch(successHandler(data));
    dispatch(loadingHandler(false));
    dispatch(failHandler(false));
  } catch (err) {
    dispatch(failHandler(err.messsage));
    dispatch(loadingHandler(false));
  }
};

export default loginOneUser;
