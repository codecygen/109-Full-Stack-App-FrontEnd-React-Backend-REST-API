import { useState, useCallback, useEffect } from "react";

const useConnectApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const getAll = useCallback(async () => {
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
      setIsFetched(true);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  const getOne = () => {};

  useEffect(() => {
    getAll();
  }, [getAll]);

  return {
    data,
    isLoading,
    error,
    isFetched,
    getAll,
    getOne,
  };
};

export default useConnectApi;
