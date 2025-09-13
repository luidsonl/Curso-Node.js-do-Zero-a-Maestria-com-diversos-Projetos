import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';
import { useAuthContext } from "../../../contexts/AuthContext";
import { ROUTES } from "../../../routes/appRoutes";
import OfferService from "../../../services/OfferService";

function CrerateOfferModal({modalToggle, card}) {
  const { token, user, validateToken } = useAuthContext();
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    price: 3,
    due: null
  });

  if (!user) return null;

  const validatePrice = (e) => {
    const { name, value } = e.target;

    if (value === "") {
      setFormData(prev => ({ ...prev, [name]: "" }));
      return;
    }

    let numValue = Math.floor(Number(value));

    if (isNaN(numValue) || numValue < 1) {
      numValue = 1;
    } else if (numValue > 99) {
      numValue = 99;
    }

    setFormData(prev => ({ ...prev, [name]: numValue }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    
    if (value === "" || /^\d+$/.test(value)) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const newErrors = {};
    if (!formData.price || formData.price === "") {
      newErrors.price = "Informe o preço";
    } else if (formData.price < 1 || formData.price > 99) {
      newErrors.price = "O preço deve ser entre 1 e 99";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});

    const data = new FormData();
    data.append('cardId', card._id);
    data.append("price", formData.price);
    if(formData.due){
      data.append("due", formData.due);
    }
    console.log(data);

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
        <h1>Vender</h1>
        {error.submit && <p className="error">{error.submit}</p>}

        <form onSubmit={handleSubmit}>
          <h2>{card.name}</h2>

          <label>
            Preço
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              min="1"
              max="99"
              required
              value={formData.price}
              onChange={handlePriceChange}
              onBlur={validatePrice}
              name="price"
            />
            {error.price && <p className="error">{error.price}</p>}
          </label>
          <label>
            Due date
            <input 
              type="date"
              name="due"
              onChange={handleChange}
            />
          </label>

          <div className="form-buttons">
            <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
            <button type="submit">Criar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrerateOfferModal;