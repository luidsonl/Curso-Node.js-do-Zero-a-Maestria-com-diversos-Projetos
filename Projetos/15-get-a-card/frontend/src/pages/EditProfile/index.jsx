import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './style.css'
import AuthService from "../../services/AuthService";
import { ROUTES } from "../../routes/appRoutes";


function EditProfile(){

    const {token, user} = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: '',
        confirmPassword: '',
        phone: user.phone,
        profilePicture: null
    });
    

    if(!user){
        return null;
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== "") {
                    data.append(key, value);
                }
            });

            await AuthService.update(data, token);
            navigate(ROUTES.PROFILE);
        } catch (err) {
            setError(err.message);
        }
    };
   

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registrar</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <label>
                Nome
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>

            <label>
                Email
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>

            <label>
                Senha
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleChange}
                />
            </label>

            <label>
                Confirme a Senha
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme a Senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </label>

            <label>
                Telefone
                <input
                    type="tel"
                    name="phone"
                    placeholder="Telefone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </label>

            <label>
                Foto de Perfil
                <input 
                    type="file"
                    name="profilePicture"
                    onChange={handleChange}
                />
            </label>
            <button onClick={()=>{navigate(-1)}}>Voltar</button>
            <button type="submit">Atualizar</button>
        </form>
    );
}


export default EditProfile;