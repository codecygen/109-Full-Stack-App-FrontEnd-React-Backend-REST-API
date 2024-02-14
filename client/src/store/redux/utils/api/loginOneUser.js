// Authentication-and-Authorization-Frontend
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

    const expiry = new Date().getTime() + 3600000;

    localStorage.setItem("token", data.token);
    localStorage.setItem("tokenName", data.name);
    localStorage.setItem("tokenExpiry", expiry);

    dispatch(successHandler(data));
    dispatch(loadingHandler(false));
    dispatch(failHandler(false));
  } catch (err) {
    dispatch(failHandler(err.message));
    dispatch(loadingHandler(false));
  }
};

export default loginOneUser;
