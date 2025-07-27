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

    static async getById(id){
        
        const offer = await Offer.findById(id)

        return offer;
    }

    static async getOpenbyPage(page = 1, offset = 10, populateRefs = true){
        const skip = (page - 1) * offset;
        let query = Offer.find({"status": "open"}).skip(skip).limit(offset);

        if (populateRefs) {
            query = query.populate('card').populate('seller');
        }
        
        const offers = await query.exec();
        return offers;

    }

    static async cancel(orderId, token){
        const offer = await Offer.findById(orderId).populate('card');
        const user = await UserService.getUserByToken(token);

        if(!offer){
            const error = new Error('Oferta não encontrada');
            error.httpCode = 404;

            throw error;
        }

        const card = offer.card;

        if(!user || !offer.seller.equals(user._id)){
            const error = new Error('Usuário não é dono da oferta');
            error.httpCode = 403;

            throw error;
        }

        if(offer.status == 'canceled'){
            const error = new Error('Oferta já foi cancelada');
            error.httpCode = 409;

            throw error;
        }

        card.available = true;
        offer.status = 'canceled';

        await card.save();
        await offer.save()

        return offer;
    }
}

export default OfferService;