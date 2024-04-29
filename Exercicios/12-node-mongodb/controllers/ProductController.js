const Product = require('../models/Product')

module.exports = class ProductController{
    static async showProducts(req, res){

        const products = await Product.getProducts()
        res.render('products/all', {products})
    }

    static createProduct(req, res){
        res.render('products/create')
    }

    static postCreateProduct(req, res){
        const data = req.body

        const product = new Product(data)
        product.save()
        res.redirect('/products')
    }
}