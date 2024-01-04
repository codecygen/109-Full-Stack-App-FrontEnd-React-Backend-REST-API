import { useState } from "react";

const useConnectApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAll = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/database/posts.json");
      if (!res.ok) {
        throw new Error(`HTTP error! Status Code: ${res.status}`);
      }

      const data = await res.json();
      setData(data);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const getOne = () => {};

  return {
    data,
    isLoading,
    error,
    getAll,
    getOne,
  };
};

export default useConnectApi;
