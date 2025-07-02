
class CardController{
    static async create(req, res){
        res.json({message: 'lero lero lero lero lero'})
    }

    static async getById(req, res){
        try {
            const { title, description, price, featured_image, gallery, isArtisan, phone } = req.body;


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