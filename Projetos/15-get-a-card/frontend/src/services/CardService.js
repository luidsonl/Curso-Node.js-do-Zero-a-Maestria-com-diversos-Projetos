import fetchClient from "../api/fetchClient";

class CardService{
    static async getCards(page = 1, offset = 10){
        const cards = await fetchClient(`cards/?page=${page}&offset=${offset}`,{
            method: 'GET'
        });

        return cards;
    }
}

export default CardService;