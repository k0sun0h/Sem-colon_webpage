import { useState, useCallback } from "react";

export function useAsync() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (fn) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fn();
      return result;
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { run, loading, error };
}