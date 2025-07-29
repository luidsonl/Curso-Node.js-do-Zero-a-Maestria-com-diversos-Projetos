import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchClient } from '../api/fetchClient';
import { useAuthContext } from '../contexts/AuthContext';

export function useAuth({ redirectIfNotAuth = false } = {}) {
  const { token, setToken } = useAuthContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);
      try {
        const data = await fetchClient('users/check');
        setUser(data);
      } catch (error) {
        setUser(null);
        if (redirectIfNotAuth) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token, redirectIfNotAuth, navigate]);

  return { user, loading, token, login, logout };
}
