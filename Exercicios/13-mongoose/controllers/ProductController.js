import Product from "../models/product.js";

class ProductController {
    static async renderAllProducts(req, res){

        const products = await Product.getProducts()
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
        const featured_image = req.body.name.featured_image
        const gallery = req.body.gallery

        const product = new Product({name, sku, price, description, featured_image, gallery})
        await product.save()
        res.redirect('/products')
    }

    static async renderProductPage(req, res){
        const id = req.params.id

        const product = await Product.getProductById(id)
        res.render('products/product', {product})
    }

    static async removeProduct(req, res){
        const id = req.params.id

        await Product.removeProduct(id)
        res.redirect('/products')
    }

    static async renderEditProductPage(req, res){
        const id = req.params.id

        const product = await Product.getProductById(id)
        res.render('products/edit', {product})
    }

    static async updateProduct(req, res){
        const data = req.body
        const id = req.params.id

        const product = new Product(data)
        product.update(id)
        res.redirect(`/products/${id}`)
    }
}

export default ProductController