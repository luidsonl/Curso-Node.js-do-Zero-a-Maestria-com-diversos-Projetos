import MediaService from "../services/MediaService.mjs";
import UserService from "../services/UserService.mjs";
import AuthService from "../services/AuthService.mjs";
import getToken from "../helpers/getToken.mjs";

class MediaController{
    static async get(req, res){
        res.json({message: 'lero lero lero lero lero'})
    }

    static async create(req, res){
        try {
            const files = req.files;

            if(!files){
                throw new Error('Sem arquivo');
            }

            if (!req.headers.authorization) {
                return res.status(401).json({ message: 'Acesso negado: token não fornecido' });
            }
                  
            const token = await getToken(req);
            const decoded = AuthService.decodeToken(token);
            const currentUser = await UserService.getUserById(decoded.id);

            let medias = [];
            
            for (const key in files) {
                const media = await MediaService.create(files[key]);
                medias.push(media);
            }
            
            res.status(200).json({
                message: 'Arquivo enviado',
                media: medias
            })
        } catch (error) {
            res.status(500).json({ 
            message: 'Erro ao registrar arquivo', 
            error: error.message 
      });
        }
    }

    static async update(req, res){
        res.json({message: 'lero lero lero lero lero'})
    }

    static async delete(req, res){
        res.json({message: 'lero lero lero lero lero'})
    }
}

export default MediaController;