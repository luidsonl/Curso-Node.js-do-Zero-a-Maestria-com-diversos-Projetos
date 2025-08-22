import { useEffect, useState } from "react";
import CardService from "../../services/CardService";
import { useSearchParams } from "react-router-dom";
import TransmuteButton from "../../components/TransmuteButton";

function Home (){
    const [posts, setPosts] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;

    useEffect(()=>{
        async function fetchCards() {
            const posts = await CardService.get(page);
            
            console.log(posts)
        }

        fetchCards();
    },[page])

    return(
        <main>
            <h1>Get a card</h1>

            <p>{page}</p>

            <TransmuteButton/>
        </main>
    )
}

export default Home;