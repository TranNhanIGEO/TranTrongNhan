import { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';
import { axiosAPI } from 'utilities/axiosAPI';

type FetchDataState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function useFetchData<T>(url: string, config?: AxiosRequestConfig): FetchDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosAPI.get<T>(url, config);
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, config]);

  return { data, loading, error };
}

export default useFetchData;
