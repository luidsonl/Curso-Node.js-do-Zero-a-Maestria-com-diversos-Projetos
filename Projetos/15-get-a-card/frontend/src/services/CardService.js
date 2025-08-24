import fetchClient from "../api/fetchClient";

class CardService{
    static async getByPage(page = 1, offset = 10){
        const cards = await fetchClient(`cards/?page=${page}&offset=${offset}`,{
            method: 'GET'
        });

        return cards;
    }
    static async getByUser(userId){
        const cards = await fetchClient(`cards/user/${userId}`,{
            method: 'GET'
        });

        return cards;
    }

    static async getOne(id){
        const card = await fetchClient(`cards/${id}`,{
            method: 'GET'
        });

        return card;
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