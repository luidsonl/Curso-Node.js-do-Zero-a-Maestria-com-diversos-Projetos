import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { fetchClient } from '../../api/fetchClient';

export default function ProtectedRoutes() {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  const { token } = useAuthContext();
  
    async function check(){
      await fetchClient('users/check', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {
        setIsValid(true);
      }).catch(() => {
        setIsValid(false);
      }).finally(()=>{
        setLoading(false);
      });
  }

  useEffect(()=>{
    check();
  },[token])

  if (loading) return <p>Carregando...</p>;

  return isValid ? <Outlet /> : <Navigate to="/login" replace />;
}
