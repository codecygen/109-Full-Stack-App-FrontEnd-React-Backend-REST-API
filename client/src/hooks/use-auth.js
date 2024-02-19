import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const expiry = +localStorage.getItem("tokenExpiry");
    const current = new Date().getTime();
    const rest = expiry - current;

    if (expiry && rest > 0) {
      setToken(localStorage.getItem("token"));
      setName(localStorage.getItem("tokenName"));
      setStatus(localStorage.getItem("tokenStatus"));

      const timeout = setTimeout(() => {
        window.location.reload(true);
        navigate("/login");
      }, rest);

      return () => clearTimeout(timeout);
    } else {
      setToken(null);
      setName(null);
      setStatus(null);

      localStorage.removeItem("token");
      localStorage.removeItem("tokenName");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("tokenStatus");
    }
  }, [navigate]);

  return {
    token,
    name,
    status,
  };
};

export default useAuth;
