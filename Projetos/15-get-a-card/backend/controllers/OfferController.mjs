import pick from "../helpers/pick.mjs";
import OfferService from "../services/OfferService.mjs";
import getToken from "../helpers/getToken.mjs";
import validateObjectId from "../helpers/validateObjectId.mjs";

class OfferController{

    static async getOpenbyPage(req, res){
        try {
            const page = req.query.page || 1;
            const offers = await OfferService.getOpenbyPage(page);

            return res.status(200).json(offers);
        } catch (error) {
            
        }
    }

    static async getById(req, res){
        try {
            const id = req.params.id;

            if(!validateObjectId(id)){
                return res.status(404).json({ message: 'Oferta não encontrada' });
            }

            const offer = await OfferService.getById(id)

            if (!offer) {
                return res.status(404).json({ message: 'Oferta não encontrada' });
            }

            return res.status(200).json(offer);
        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
                message: 'Erro ao buscar oferta', 
                error: error.message 
            });
        }

       
    }

    static async getByUserId(req, res){

        try {
            const userId = req.params.userId;
            const page = req.query.page;
            
            if(!validateObjectId(userId)){
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const offers = await OfferService.getByUserIdByPage(userId, page);

            return res.status(200).json(offers)
        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
                message: 'Erro ao buscar ofertas', 
                error: error.message 
            });
        }
        
    }

    static async getByCardId(req, res){
        try {
            const cardId = req.params.cardId;
            
            if(!validateObjectId(cardId)){
                return res.status(404).json({ message: 'Card não encontrado' });
            }

            const offer = await OfferService.getByCardId(cardId);

            if(!offer){
                return res.status(404).json({
                    message: 'Offer não encontrada'
                });
            }

            return res.status(200).json(offer);
        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
                message: 'Erro ao buscar oferta', 
                error: error.message 
            });
        }
    }

    static async create( req, res){
        try {
            const data = pick(req.body, ['cardId', 'price', 'due']);
            const token = await getToken(req);

            const Offer = await OfferService.create(data, token);

            return res.status(200).json(Offer);
            
        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
                message: 'Erro ao criar oferta', 
                error: error.message 
            });
        }
    }

    static async cancel(req, res){
        try {
            const token = await getToken(req);
            const id = req.params.id;

            if(!validateObjectId(id)){
                return res.status(404).json({ message: 'Oferta não encontrada' });
            }

            const offer = await OfferService.cancel(id, token);

            return res.status(200).json(offer);

        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
                message: 'Erro ao cancelar oferta', 
                error: error.message 
            });
        }
        
    }

    static async execute(req, res){
        try {
            const token = await getToken(req);
            const orderId = req.params.id;

            if(!validateObjectId(orderId)){
                return res.status(404).json({ message: 'Oferta não encontrada' });
            }

            const offer = await OfferService.execute(orderId, token);

            return res.status(200).json(offer);

        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
                message: 'Erro ao executar compra', 
                error: error.message 
            });
        }
    }


}

export default OfferController;