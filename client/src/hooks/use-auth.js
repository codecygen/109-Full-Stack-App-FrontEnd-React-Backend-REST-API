import { useState, useEffect } from "react";

const useAuth = () => {
  const [token, setToken] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    const expiry = +localStorage.getItem("tokenExpiry");
    const current = new Date().getTime();

    if (expiry && expiry > current) {
      setToken(localStorage.getItem("token"));
      setName(localStorage.getItem("tokenName"));
    } else {
      setToken(null);
      setName(null);
    }
  }, []);

  return {
    token,
    name,
  };
};

export default useAuth;
