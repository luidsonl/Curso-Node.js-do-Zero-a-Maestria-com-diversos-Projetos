import { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/AuthService';
import fetchClient from '../api/fetchClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  useEffect(()=>{
    if(token){
      validateToken();
    }
  },[])

  const login = async (email, password) => {
    const { token, user } = await AuthService.login(email, password);
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const register = async (formData) => {
    const { token, user } = await AuthService.register(formData);
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const validateToken = async ()=>{
    const user = await AuthService.check(token).catch(() => {
      setToken(null);
      setUser(null);
    })

    setUser(user);
  }


  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, validateToken }}>
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
