import { useState, useCallback } from "react";

export const useApi = (service) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (method, ...args) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await service[method](...args);
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.detail || err.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [service],
  );

  return { data, isLoading, error, execute };
};
