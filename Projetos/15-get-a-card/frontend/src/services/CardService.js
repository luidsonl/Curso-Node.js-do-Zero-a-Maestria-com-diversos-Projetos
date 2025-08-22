import fetchClient from "../api/fetchClient";

class CardService{
    static async get(page = 1, offset = 10){
        const cards = await fetchClient(`cards/?page=${page}&offset=${offset}`,{
            method: 'GET'
        });

        return cards;
    }

    static async create(formData, token){
        const card = await fetchClient('cards/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData,
        });

        return card;
    }
}

export default CardService;