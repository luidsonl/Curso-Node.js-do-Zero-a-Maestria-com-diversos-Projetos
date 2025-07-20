import UserService from "./UserService.mjs";
import MediaService from "./MediaService.mjs";
import Media from "../models/Media.mjs";
import Card from "../models/Card.mjs";
import FieldValidator from "../helpers/FieldValidator.mjs";


class CardService{
    static async createCard(data, token){

        const user = await UserService.getUserByToken(token);

        const { name, description, price, featuredImage, gallery, tags } = data;

        const requiredFields = {
            name: name,
            description: description,
            featuredImage: featuredImage
        };
        
        for (const [field, value] of Object.entries(requiredFields)){
            if(!FieldValidator.requiredField(value)){
                const error = new Error(`Campo ${field} é obrigatório`);
                error.httpCode = 400;

                throw error;
            }
        }

        if(user.alchemy <= 0){
            const error = new Error('Alquimia insuficiente para criar nova carta');
            error.httpCode = 403;

            throw error;
        }

        const featuredImageObj = await MediaService.create(featuredImage, user, 'cards', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
        
        const galleryObj = [];

        if (gallery) {
            for (const image of gallery) {
                const imageObj = await MediaService.create(image, user, 'cards', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
                galleryObj.push(imageObj);
            }
        }

        const card = new Card({
            name: name,
            alchemist: user._id,
            available: false,
            owner: user._id,
            description: description,
            price: price,
            featuredImage: featuredImageObj,
            gallery: galleryObj,
            tags: tags
        })


        const newCard = await card.save();

        return newCard;
    }

    static async getCardById(id){
        const card = await Card.findById(id);

        return card;
    }

    static async getCardByUserId(userId){
        const cards = await Card.find({
            owner: userId
        })

        return cards;
    }

    static async deleteCardById(token, id){

        if(!id){
            const error = new Error('Campo id é obrigatório');
            error.httpCode = 404;
            throw error;
        }

        const card = await this.getCardById(id);
        if(!card){
            const error = new Error('Card não encontrado');
            error.httpCode = 404;
            throw error;
        }
        const user = await UserService.getUserByToken(token);

        
        if(!user || !card.owner.equals(user._id)){
            const error = new Error('Usuário não é dono do card')
            error.httpCode = 403;

            throw error;
        }

        await MediaService.deleteById(card.featuredImage.toString());
        
        if (card.gallery.length > 0){
            for(const mediaId of card.gallery){
                await MediaService.deleteById(mediaId.toString());
            }
        }

        const delectedCard = await Card.findByIdAndDelete(id);

        return delectedCard;
    }
}


export default CardService;