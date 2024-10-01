import Product from "../models/product.js";

class ProductController {
    static async renderAllProducts(req, res){

        const products = await Product.find().lean()
        res.render('products/all', {products})
    }

    static renderCreateProductPage(req, res){
        res.render('products/create')
    }

    static async createProduct(req, res){
        const name = req.body.name
        const sku = req.body.sku
        const price = req.body.price
        const description = req.body.description
        const featured_image = req.body['featured-image']
        const gallery = req.body.gallery

        const product = new Product({name, sku, price, description, featured_image, gallery})
        await product.save()
        res.redirect('/products')
    }

    static async renderProductPage(req, res){
        const sku = req.params.sku

        const product = await Product.findOne({sku: sku}).lean()
        res.render('products/product', {product})
    }

    static async removeProduct(req, res){
        const id = req.params.id

        await Product.deleteOne({_id: id})
        res.redirect('/products')
    }

    static async renderEditProductPage(req, res){
        const sku = req.params.sku

        const product = await Product.findOne({sku: sku}).lean()
        res.render('products/edit', {product})
    }

    static async updateProduct(req, res){
        const name = req.body.name
        const sku = req.body.sku
        const price = req.body.price
        const description = req.body.description
        const featured_image = req.body['featured-image']
        const gallery = req.body.gallery

        const product = {name, sku, price, description, featured_image, gallery}

        console.log(product)

        await Product.updateOne({_id: req.params.id}, product)
        res.redirect(`/products/${sku}`)
    }
}

export default ProductController