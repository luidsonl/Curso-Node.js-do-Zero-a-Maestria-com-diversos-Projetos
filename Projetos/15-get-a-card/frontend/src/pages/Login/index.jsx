import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchClient } from '../../api/fetchClient';
import { useAuthContext } from '../../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {token, setToken} = useAuthContext();
  const {user, setUser} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchClient('users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setToken(data.token);

      const userToSet = await fetchClient(`users/${data.userId}`, {
        method: 'GET'
      });
      
      setUser(userToSet);

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;