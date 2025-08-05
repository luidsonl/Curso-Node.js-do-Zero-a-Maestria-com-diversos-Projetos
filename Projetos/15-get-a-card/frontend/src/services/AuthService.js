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

    return { token: data.token,user: user };
  }


  static async login(email, password) {
    const data = await fetchClient('users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const user = await fetchClient(`users/${data.userId}`, {
      method: 'GET',
    });

    return { token: data.token, user: user };
  }

  static async update(formData, token) {

    const data = await fetchClient('users/update', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...(formData instanceof FormData ? {} : { 'Content-Type': 'application/json' })
      },
      body: formData instanceof FormData ? formData : JSON.stringify(formData),
    });

    return data;
  }
}

export default AuthService;
