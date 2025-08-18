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
    console.log(formData);
    const currentUser = await fetchClient('users/check', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
  }

  static async check(token){
    const user = await fetchClient('users/check', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return user;
  }
}

export default AuthService;
