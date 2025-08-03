import fetchClient from "../api/fetchClient";

class AuthService {
  static async register(formData) {
    const data = await fetchClient('users/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const user = await fetchClient(`users/${data.userId}`, {
      method: 'GET',
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(user));

    return { token: data.token, user };
  }


  static async login(email, password) {
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
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getUser() {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
}

export default AuthService;
