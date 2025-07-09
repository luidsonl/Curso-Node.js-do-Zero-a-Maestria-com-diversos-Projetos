import MediaService from "../services/MediaService.mjs";

class MediaController{
    static async get(req, res){
        res.json({message: 'lero lero lero lero lero'})
    }

    static async create(req, res){
        const files = req.files;
        try {
            const media = await MediaService.create(files);
            res.status(200).json({
                message: 'Arquivo enviado',
                media: media
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