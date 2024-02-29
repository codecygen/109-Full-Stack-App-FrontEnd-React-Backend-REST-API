// Authentication-and-Authorization-Frontend
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [color, setColor] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const expiry = +localStorage.getItem("tokenExpiry");
    const current = new Date().getTime();
    const rest = expiry - current;

    if (expiry && rest > 0) {
      setToken(localStorage.getItem("token"));
      setName(localStorage.getItem("tokenName"));
      setColor(localStorage.getItem("tokenColor"));
      setStatus(localStorage.getItem("tokenStatus"));

      const timeout = setTimeout(() => {
        navigate(0);
      }, rest);

      return () => clearTimeout(timeout);
    } else {
      setToken(null);
      setName(null);
      setStatus(null);

      localStorage.removeItem("token");
      localStorage.removeItem("tokenName");
      localStorage.removeItem("tokenColor");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("tokenStatus");
    }
  }, [navigate]);

  return {
    token,
    name,
    color,
    status,
  };
};

export default useAuth;
