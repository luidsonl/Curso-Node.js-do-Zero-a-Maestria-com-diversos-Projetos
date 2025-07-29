import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchClient } from '../api/fetchClient';
import { useAuthContext } from '../contexts/AuthContext';

export function useAuth({ redirectIfNotAuth = false } = {}) {
  const { token, setToken } = useAuthContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);
      
      if (!token) {
        setUser(null);
        if (redirectIfNotAuth) {
          navigate('/login');
        }
        setLoading(false);
        return;
      }

      try {
        
        const data = await fetchClient('users/check', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('User verification successful:', data);
        setUser(data);
      } catch (error) {
        console.error('Token verification failed:', error);
        
        setToken(null);
        setUser(null);
        
        if (redirectIfNotAuth) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token, redirectIfNotAuth, navigate, setToken]);

  return { user, loading };
}