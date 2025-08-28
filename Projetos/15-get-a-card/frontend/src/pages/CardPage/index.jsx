import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardService from "../../services/CardService";
import MediaService from "../../services/MediaService";

function CardPage() {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function getCard() {
      try {
        const cardData = await CardService.getOne(id);
        setCard(cardData);
        console.log(cardData);
      } catch (err) {
        console.error('Erro ao buscar card:', err);
      }
    }

    getCard();
  }, [id]);

  if (!card) return <p>Carregando...</p>;

  return (
    <section>
        <h1>{card.name}</h1>
        <img src={MediaService.getUrl(card.featuredImage.filePath)} alt="" />
        <p>{card.description}</p>
    </section>
  );
}

export default CardPage;
