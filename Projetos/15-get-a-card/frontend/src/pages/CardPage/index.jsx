import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardService from "../../services/CardService";
import MediaService from "../../services/MediaService";
import Tag from "../../components/Tag";
import { useAuthContext } from "../../contexts/AuthContext";
import CreateOfferButton from "../../components/CreateOfferButton";
import CancelOfferButton from "../../components/CancelOfferButton";

function CardPage() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const {user} = useAuthContext();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!id) return;

    async function getCard() {
      try {
        const cardData = await CardService.getOne(id);
        setCard(cardData);
        console.log(cardData.tags);
      } catch (err) {
        console.error('Erro ao buscar card:', err);
      }
    }

    getCard();
  }, [id, refresh]);


  if (!card) return <p>Carregando...</p>;

  return (
    <section>
        <h1>{card.name}</h1>
        <img src={MediaService.getUrl(card.featuredImage.filePath)} alt="" />
        <p>{card.description}</p>
        {card.tags && card.tags.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}

        {card.gallery && card.gallery.map((image,i)=>(
          <img key={i} src={MediaService.getUrl(image.filePath)}/>
        ))}

        {card && user && (
          <>
            {card.alchemist === user._id && card.available && (
              <CreateOfferButton card={card} setRefresh={setRefresh} />
            )}
            {card.alchemist === user._id && !card.available && (
              <CancelOfferButton card={card} setRefresh={setRefresh} />
            )}
          </>
        )}

    </section>
  );
}

export default CardPage;
