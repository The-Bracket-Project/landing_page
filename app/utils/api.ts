// API Configuration - Frontend should always call local Next.js API routes
const baseURL = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

export { baseURL };

// API utility functions
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${baseURL}${endpoint}`;
  
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

  return response.json();
}