import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';
import CardService from "../../../services/CardService";
import { useAuthContext } from "../../../contexts/AuthContext";
import { ROUTES } from "../../../routes/appRoutes";
import OfferService from "../../../services/OfferService";

function CrerateOfferModal({modalToggle}) {
  const { token, user, validateToken } = useAuthContext();
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    price: 3,
    due: null
  });

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.price) newErrors.name = "Informe o preço";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});

    const data = new FormData();
    data.append("price", formData.price);
    if(formData.due){
      data.append("due", formData.due);
    }
    

    try {
      await OfferService.create(data, token);

      await validateToken();
      modalToggle();
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError({ submit: err.message });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={() => modalToggle()}>&times;</span>
        <h1>Registrar</h1>
        {error.submit && <p className="error">{error.submit}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
            />
            {error.name && <span className="error">{error.name}</span>}
          </label>

          <label>
            Descrição
            <textarea
              name="description"
              placeholder="Descrição"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <div className="form-buttons">
            <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
            <button type="submit">create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrerateOfferModal;
