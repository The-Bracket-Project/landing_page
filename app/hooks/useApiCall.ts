import { useState } from 'react';

interface UseApiCallReturn<T> {
  call: (endpoint: string, options?: RequestInit) => Promise<T>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useApiCall<T = unknown>(): UseApiCallReturn<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = async (endpoint: string, options: RequestInit = {}): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const url = `${window.location.origin}${endpoint}`;
      
      const defaultHeaders = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers: defaultHeaders,
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { call, loading, error, clearError };
}