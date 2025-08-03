import { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(AuthService.getToken());
  const [user, setUser] = useState(AuthService.getUser());

  useEffect(() => {
    setToken(AuthService.getToken());
    setUser(AuthService.getUser());
  }, []);

  const login = async (email, password) => {
    const { token, user } = await AuthService.login(email, password);
    setToken(token);
    setUser(user);
  };

  const register = async (formData) => {
    const { token, user } = await AuthService.register(formData);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    AuthService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
