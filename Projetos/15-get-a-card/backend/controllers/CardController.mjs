import pick from "../helpers/pick.mjs";
import CardService from "../services/CardService.mjs";
import getToken from "../helpers/getToken.mjs";


class CardController{
    static async create(req, res){
        const data = pick(req.body, ['title', 'description', 'price', 'tags']);
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
            const { title, description, price, featured_image, gallery, phone } = req.body;


        } catch (error) {
            
        }
    }
    static async getByUserId(req, res){
        res.json({message: 'ZAWARUDO'})
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