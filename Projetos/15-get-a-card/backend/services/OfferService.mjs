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

    static async getByCardId(cardId){
        const offer = await Offer.findOne({ card: cardId});

        return offer;
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

    static async execute(orderId, token){
        const offer = await Offer.findById(orderId).populate('card').populate('seller');

        if(!offer){
            const error = new Error('Oferta não encontrada');
            error.httpCode = 404;

            throw error;
        }

        const card = offer.card;
        const price = offer.price;
        const buyer = await UserService.getUserByToken(token);
        const seller = offer.seller;
        const due = offer.due;

        if(offer.status != 'open'){
            const error = new Error('Oferta já foi encerrada');
            error.httpCode = 409;

            throw error;
        }

        if(due){
            const dueDate = new Date(due);
            if (dueDate < new Date()) {
                const error = new Error('Oferta expirou');
                error.httpCode = 403;

                throw error;
            }
        }

        if(!buyer){
            const error = new Error('Usuário não encontrado');
            error.httpCode = 404;

            throw error;
        }

        if(offer.seller._id.equals(buyer._id)){
            const error = new Error('Usuário é o dono da oferta');
            error.httpCode = 403;

            throw error;
        }

        if(price > buyer.alchemy){
            const error = new Error('Alquimia insuficiente');
            error.httpCode = 403;

            throw error;
        }


        buyer.alchemy = buyer.alchemy - price;
        seller.alchemy = seller.alchemy + price;
        offer.buyer = buyer._id;
        offer.status = 'executed';
        card.available = true;
        card.owner = buyer._id;

        await offer.save();
        await card.save()
        await buyer.save();
        await seller.save();

        return offer;

    }

    static async getByUserIdByPage(userId ,page = 1, offset = 10, populateRefs = true){
       
        const skip = (page - 1) * offset;

        let query = Offer.find({
            seller: userId
        }).skip(skip).limit(offset);

        if (populateRefs) {
            query = query.populate('card');
        }

        const offers = await query.exec();
        return offers;
    }
}

export default OfferService;