import { useState, useEffect } from "react";

const useAuth = () => {
  const [token, setToken] = useState();
  const [name, setName] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    const expiry = +localStorage.getItem("tokenExpiry");
    const current = new Date().getTime();

    if (expiry && expiry > current) {
      setToken(localStorage.getItem("token"));
      setName(localStorage.getItem("tokenName"));
      setStatus(localStorage.getItem("tokenStatus"));
    } else {
      setToken(null);
      setName(null);

      localStorage.removeItem("token");
      localStorage.removeItem("tokenName");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("tokenStatus");
    }
  }, []);

  return {
    token,
    name,
    status,
  };
};

export default useAuth;
