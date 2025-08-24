import { useEffect, useState } from "react";
import CardService from "../../services/CardService";
import { useSearchParams } from "react-router-dom";
import TransmuteButton from "../../components/TransmuteButton";
import CardFrame from "../../components/CardFrame";
import MediaService from "../../services/MediaService";

function Home (){
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const [cards, setCards] = useState([]);

    useEffect(()=>{
        async function fetchCards() {
            const cards = await CardService.getByPage(page);
            
            console.log(cards);
            setCards(cards);
        }

        fetchCards();
    },[page])

    return(
        <>
            <h1>Get a card</h1>

            {cards.map((card)=>(
                <>
                <CardFrame 
                    name={card.name}
                    id={card.id}
                    featuredImage={MediaService.getUrl(card.featuredImage.filePath)}
                    owner={card.owner.name}
                />
                </>
            ))}

            <TransmuteButton/>
        </>
    )
}

export default Home;