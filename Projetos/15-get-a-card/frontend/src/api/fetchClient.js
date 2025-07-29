const BASE_URL = process.env.REACT_APP_BASE_API_URL;

export async function fetchClient(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const opts = {
    ...options,
    headers,
    credentials: 'include'
  };

  const res = await fetch(`${BASE_URL}${url}`, opts);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erro na requisição');
  }

  return res.json();
}
