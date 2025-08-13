import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './style.css'


function EditProfile(){

    const {user, refresh} = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    

    if(!user){
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

     const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await refresh()
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
            <button onClick={()=>{navigate(-1)}}>Voltar</button>
            <button type="submit">Atualizar</button>
        </form>
    );
}


export default EditProfile;