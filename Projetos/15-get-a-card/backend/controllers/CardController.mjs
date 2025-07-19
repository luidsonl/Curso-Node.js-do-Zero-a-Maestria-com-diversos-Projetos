import pick from "../helpers/pick.mjs";
import CardService from "../services/CardService.mjs";
import getToken from "../helpers/getToken.mjs";


class CardController{
    static async create(req, res){
        const data = pick(req.body, ['name', 'description', 'price', 'tags']);
        data['featuredImage'] = req.files.featuredImage;
        data['gallery'] = req.files.gallery;

        const token = await getToken(req);
        try {
            const card = await CardService.createCard(data, token);
            return res.status(200).json(card);
        } catch (error) {
            return res.status(error.httpCode ?? 500).json({ 
            message: 'Erro ao criar carta', 
            error: error.message 
        });
        }
    }

    static async getById(req, res){
        try {
            const id = req.params.id;

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

    static async update(req, res){
        res.json({message: 'lero lero lero lero lero'})
    }
    static async transfer(req, res){
        res.json({message: 'lero lero lero lero lero'})
    }

    static async delete(req, res){
        res.json({message: 'lero lero lero lero lero'})
    }
}

export default CardController;