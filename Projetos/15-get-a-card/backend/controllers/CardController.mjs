import pick from "../helpers/pick.mjs";
import CardService from "../services/CardService.mjs";
import getToken from "../helpers/getToken.mjs";
import validateObjectId from "../helpers/validateObjectId.mjs";


class CardController{
    static async create(req, res){
        
        try {
            const data = pick(req.body, ['name', 'description', 'price', 'tags']);

            if(req.files){
                data['featuredImage'] = req.files.featuredImage;
                data['gallery'] = req.files.gallery;
            }
            

            const token = await getToken(req);

            const card = await CardService.createCard(data, token);
            return res.status(200).json(card);
        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
            message: 'Erro ao criar carta', 
            error: error.message 
        });
        }
    }

    static async getByPage(req, res){
        try {
            const page = req.query.page || 1;
            const offset = req.query.offset || 10;
            const cards = await CardService.getCardsByPage(page, offset)

            return res.status(200).json(cards);
        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
                message: 'Erro ao buscar cards', 
                error: error.message 
            });
        }
    }

    static async getById(req, res){
        try {
            const id = req.params.id;
            if(!validateObjectId(id)){
                return res.status(404).json({ message: 'Card não encontrado' });
            }

            const card = await CardService.getCardById(id)

            if (!card) {
                return res.status(404).json({ message: 'Card não encontrado' });
            }
            
            return res.status(200).json(card);

        } catch (error) {
             return res.status(error.httpCode ?? 500).json({ 
                message: 'Erro ao buscar card', 
                error: error.message 
            });
        }
    }
    static async getByUserId(req, res){
        try {
            const userId = req.params.userId;

            const cards = await CardService.getCardByUserId(userId);

            if (!cards) {
                return res.status(404).json({ message: 'Card não encontrado' });
            }
            
            return res.status(200).json(cards);

        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
                message: 'Erro ao buscar card', 
                error: error.message 
            });
        }
    }

    static async delete(req, res){
        try {
            const token = await getToken(req);
            const id = req.params.id;

            const delectedCard = await CardService.deleteCardById(token, id);

            if (!delectedCard) {
                return res.status(404).json({ message: 'Card não encontrado' });
            }

            return res.status(200).json({
                message: 'Card deletado com sucesso',
                card: delectedCard
            });

        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
                message: 'Erro ao deletar card', 
                error: error.message 
            });
        }
    }
}

export default CardController;