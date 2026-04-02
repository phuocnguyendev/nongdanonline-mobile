import { useCallback, useEffect, useState } from 'react';

interface UseFetchDataReturn<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFetchData<T = unknown[]>(
  apiFn: (...args: unknown[]) => Promise<T>,
  params: unknown[] = [],
): UseFetchDataReturn<T> {
  const [data, setData] = useState<T>([] as unknown as T);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiFn(...params);
      setData(result);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFn, ...params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
