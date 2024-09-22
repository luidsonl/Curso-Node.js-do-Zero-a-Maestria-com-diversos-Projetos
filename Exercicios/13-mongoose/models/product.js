import { ObjectId } from "mongodb"
import {conn} from '../db/conn'

class Product{
    constructor(data){
        this.name = data.name
        this.price = data.price
        this.description = data.description
        this.image = data.image
    }

    create(){
        const product = conn.collection('products').insertOne({
            name:  this.name,
            price: this.price,
            description: this.description,
            image: this.image
        })

        return product
    }

    async update(id){
        if (!ObjectId.isValid(id)) {
            console.log(`ID inválido: , ${id}`);
            return;
        }
        const objectId = ObjectId(id)

        const product = await conn.collection('products').updateOne({_id: objectId}, {$set: this})

        return product
    }

    static getProducts(){
        const products = conn.collection('products').find().toArray()

        return products
    }

    static async getProductById(id){
        if (!ObjectId.isValid(id)) {
            console.log(`ID inválido: , ${id}`);
            return;
        }
        
        const objectId = ObjectId(id)
        const product = await conn.collection('products').findOne({_id: objectId})

        return product
    }
    static async removeProduct(id){
        if (!ObjectId.isValid(id)) {
            console.log(`ID inválido: , ${id}`);
            return;
        }
        
        const objectId = ObjectId(id)

        const product = await conn.collection('products').deleteOne({_id: objectId})
        return product
    }

}

module.exports = Product