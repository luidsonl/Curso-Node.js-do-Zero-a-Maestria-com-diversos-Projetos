import { fetchClient } from '../api/fetchClient';

const AuthService = {
  login: async (email, password) => {
    const data = await fetchClient('users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const user = await fetchClient(`users/${data.userId}`, {
      method: 'GET',
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token: data.token, user };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => localStorage.getItem('token'),
  getUser: () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  },
};

export default AuthService;
