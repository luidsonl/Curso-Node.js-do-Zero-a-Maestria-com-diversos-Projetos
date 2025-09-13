import { useEffect, useState } from "react";
import CardService from "../../services/CardService";
import TransmuteButton from "../../components/TransmuteButton";
import CardFrame from "../../components/CardFrame";
import MediaService from "../../services/MediaService";

import './style.css'
import { useAuthContext } from "../../contexts/AuthContext";

function Dashboard() {
  const [cards, setCards] = useState([]);
  const {user} = useAuthContext()

  useEffect(()=>{
      async function fetchCards() {
            if(!user){
                return;
            }

          const cards = await CardService.getByUser(user._id);
          
          setCards(cards);
      }

      fetchCards();
  },[user])

  return(
      <>
          <h1>Get a card</h1>
          <section className="cards-section">
              {cards.map((card)=>(
                  <>
                  <CardFrame 
                      name={card.name}
                      id={card._id}
                      featuredImage={MediaService.getUrl(card.featuredImage.filePath)}
                      owner={card.owner.name}
                  />
                  </>
              ))}
          </section>
          

          <TransmuteButton/>
      </>
  )
}

export default Dashboard
