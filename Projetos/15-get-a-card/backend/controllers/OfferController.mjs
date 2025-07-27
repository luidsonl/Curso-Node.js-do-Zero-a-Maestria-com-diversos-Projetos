import pick from "../helpers/pick.mjs";
import OfferService from "../services/OfferService.mjs";
import getToken from "../helpers/getToken.mjs";

class OfferController{
    static async getAll(req, res){
        res.status(200).json({
            message: 'Mr. crowley'
        })
    }

    static async getById(req, res){
        res.status(200).json({
            message: 'What went wrong with your head?'
        })
    }

    static async getByUserId(req, res){
        res.status(200).json({
            message: 'Oh mr crlowley'
        })
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
            const offer = await OfferService.cancel(id, token);

            return res.status(200).json(offer);

        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
                message: 'Erro ao cancelar oferta', 
                error: error.message 
            });
        }
        
    }


}

export default OfferController;