import Offer from "../models/Offer.mjs";
import CardService from "./CardService.mjs";
import UserService from "./UserService.mjs";

class OfferService{
    static async create(data, token){
        const seller = await UserService.getUserByToken(token);

        const { cardId, price, due } = data;

        if(!cardId){
            const error = new Error('Sem card atribuido');
            error.httpCode = 403;
            throw error;
        }

        const card = await CardService.getCardById(cardId);

        if(!card){
            const error = new Error('Card inválido');
            error.httpCode = 404;
            throw error;
        }

        if(!seller || !card.owner.equals(seller._id)){
            const error = new Error('Usuário não é dono do card');
            error.httpCode = 403;
            throw error;
        }

        if(!card.available){
            const error = new Error('Card não disponivel para venda');
            error.httpCode = 403;
            throw error;
        }

        const offer = new Offer({
            seller: seller._id,
            card: card._id,
            price: price,
            due: due,
            status: 'open'
        })

        const createdOffer = await offer.save()

        card.available = false;
        await card.save()
        
        return createdOffer;
    }
}

export default OfferService;