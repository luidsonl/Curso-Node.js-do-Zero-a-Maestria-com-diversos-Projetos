const conn = require('../db/conn')

class Product{
    constructor(data){
        this.name = data.name
        this.price = data.price
        this.description = data.description
        this.image = data.image
    }

    save(){
        const product = conn.collection('products').insertOne({
            name:  this.name,
            price: this.price,
            description: this.description,
            image: this.image
        })

        return product
    }

    static getProducts(){
        const products = conn.collection('products').find().toArray()

        return products
    }
}

module.exports = Product