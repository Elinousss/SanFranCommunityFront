import { useState, useCallback } from 'react';

export const useApi = (asyncFunction, immediate = false) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  return { data, loading, error, execute };
};
