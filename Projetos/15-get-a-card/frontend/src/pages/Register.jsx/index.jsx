import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchClient } from '../../api/fetchClient';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchClient('users/register', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registrar</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirme a Senha"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Telefone"
        value={formData.phone}
        onChange={handleChange}
      />

      <button type="submit">Registrar</button>
    </form>
  );
}
