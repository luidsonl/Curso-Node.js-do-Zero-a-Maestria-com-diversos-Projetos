import UserService from "./UserService.mjs";


class CardService{
    static async createCard(data, token){
        const user = await UserService.getUserByToken(token);

        const { title, description, price, featured_image, gallery, tags, available } = data;

        if(user.alchemy <= 0){
            const error = new Error('Alquimia insuficiente para criar nova carta');
            error.httpCode = 403;
        }
    }
}


export default CardService;