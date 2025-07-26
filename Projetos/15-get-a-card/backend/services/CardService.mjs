import UserService from "./UserService.mjs";
import MediaService from "./MediaService.mjs";
import Media from "../models/Media.mjs";
import Card from "../models/Card.mjs";
import FieldValidator from "../helpers/FieldValidator.mjs";


class CardService{
    static async createCard(data, token){

        const user = await UserService.getUserByToken(token);

        if(!user){
            const error = new Error('Usuário não encontrado');
            error.httpCode = 404;
            throw error;
        }

        const { name, description, featuredImage, gallery, tags } = data;

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
                galleryObj.push(imageObj._id);
            }
        }

        const card = new Card({
            name: name,
            alchemist: user._id,
            available: true,
            owner: user._id,
            description: description,
            featuredImage: featuredImageObj._id,
            gallery: galleryObj,
            tags: tags
        })


        const newCard = await card.save();

        return newCard;
    }

    static async getCardById(id, populateRefs = true) {
        let query = Card.findById(id);

        if (populateRefs) {
            query = query.populate('featuredImage').populate('gallery');
        }

        const card = await query.exec();

        return card;
    }


    static async getCardsByPage(page = 1, offset = 10, populateRefs = true) {
        const skip = (page - 1) * offset;
        let query = Card.find().skip(skip).limit(offset);

        if (populateRefs) {
            query = query.populate('featuredImage').populate('gallery');
        }

        const cards = await query.exec();
        return cards;
    }

    static async getCardByUserId(userId, populateRefs = true) {
        let query = Card.find({
            owner: userId
        });

        if (populateRefs) {
            query = query.populate('featuredImage').populate('gallery');
        }

        const cards = await query.exec();
        return cards;
    }


    static async deleteCardById(token, id){

        if(!id){
            const error = new Error('Campo id é obrigatório');
            error.httpCode = 404;
            throw error;
        }

        const card = await this.getCardById(id, false);
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