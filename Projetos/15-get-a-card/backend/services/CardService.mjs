import UserService from "./UserService.mjs";
import MediaService from "./MediaService.mjs";
import Media from "../models/Media.mjs";
import Card from "../models/Card.mjs";
import FieldValidator from "../helpers/FieldValidator.mjs";


class CardService{
    static async createCard(data, token){
        const user = await UserService.getUserByToken(token);

        console.log(data);

        const { title, description, price, featuredImage, gallery, tags } = data;

        const requiredFields = {
            title: title,
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

       console.log('aqui')
        const featuredImageObj = await MediaService.create(featuredImage, user, 'cards');
        
        const galleryObj = [];

        if(gallery){
            gallery.forEach(async image => {
                const imageObj = await MediaService.create(Media, user, 'cards');
                galleryObj.push(imageObj);
            });
        }

        const card = new Card({
            title: title,
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
}


export default CardService;