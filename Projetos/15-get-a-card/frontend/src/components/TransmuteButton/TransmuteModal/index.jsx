import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';
import CardService from "../../../services/CardService";
import { useAuthContext } from "../../../contexts/AuthContext";

function TransmuteModal() {
  const { token, user } = useAuthContext();
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 10,
    tags: [''],
    featuredImage: null,
    gallery: []
  });

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeaturedImage = (e) => {
    setFormData(prev => ({ ...prev, featuredImage: e.target.files[0] }));
  };

  const handleGallery = (e) => {
    setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...e.target.files] }));
  };

  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  const removeTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nome obrigatório";
    if (!formData.featuredImage) newErrors.featuredImage = "Imagem principal obrigatória";
    if (!formData.price || formData.price <= 0) newErrors.price = "Preço deve ser maior que 0";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("featuredImage", formData.featuredImage);
    formData.gallery.forEach(file => data.append("gallery", file));
    formData.tags.forEach(tag => data.append("tags[]", tag));

    try {
      console.log(data)
      await CardService.create(data, token);
      navigate(-1); // volta após atualizar
    } catch (err) {
      setError({ submit: err.message });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={() => navigate(-1)}>&times;</span>
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

          <label>
            Preço
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            {error.price && <span className="error">{error.price}</span>}
          </label>

          <h3>Tags</h3>
          <div className="tags-container">
            {formData.tags.map((tag, idx) => (
              <div key={idx}>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(idx, e.target.value)}
                />
                <button type="button" onClick={() => removeTag(idx)}>✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addTag}>+ Adicionar Tag</button>

          <h3>Imagem Principal</h3>
          <input type="file" onChange={handleFeaturedImage} />
          {error.featuredImage && <span className="error">{error.featuredImage}</span>}

          <h3>Galeria</h3>
          <input type="file" multiple onChange={handleGallery} />

          <div className="form-buttons">
            <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
            <button type="submit">create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransmuteModal;
