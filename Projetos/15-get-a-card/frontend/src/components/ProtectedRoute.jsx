import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
